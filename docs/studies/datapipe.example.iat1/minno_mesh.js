function init_minno_mesh(global) {
        global.container = document.createElement('container');
    global.canvas_div = document.createElement('div');

    global.canvas_div.style["margin-left"]  =  'auto';
    global.canvas_div.style["margin-right"] =  'auto';
    global.canvas_div.style.position        = 'absolute';
    global.canvas_div.style.bottom          = "0";



    global.full_video = document.createElement('video');
    global.full_video.className = "input_video";
    global.full_video.width  = "1280px";
    global.full_video.height = "720px";
    global.full_canvas = document.createElement('canvas');
    global.full_canvas.className = "output_canvas";
    global.full_canvas.width  = 256;
    global.full_canvas.height = 144;


    global.full_canvas.style.display  = 'block';
    global.full_canvas.style["margin"] = 'auto';
        


        



    // global.full_canvas.style["border-style"] =  "dotted";
    global.canvas_div.appendChild(global.full_video);

    global.container.appendChild(global.canvas_div);
    global.container.appendChild(global.full_canvas);
    document.body.appendChild(global.container);


    global.videoElement = document.getElementsByClassName('input_video')[0];
    global.eye_data     = [];
    global.start_recording  = start_recording;
    global.stop_recording   = stop_recording;
    global.stopVideo        = stop_video;
    global.get_all          = get_all;

    global.detectionNeeded = false;
    global.faceMesh = new FaceMesh({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }});
    global.faceMesh.setOptions({
          maxNumFaces: 1,
          selfieMode: true,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
    });
    global.faceMesh.onResults(parse_data, global);
    
    global.camera = new Camera(global.videoElement, {
          onFrame: async () => {
              if (global.stop_me)
                  return stop_video(global);
                await global.faceMesh.send({image: global.videoElement});
                // console.log({val:global.stop_me});

          },
          width: 1280,
          height: 720
    });
    global.camera.start();
    global.stop_me = false;
function parse_data(results) {
        const canvasElement = document.getElementsByClassName('output_canvas')[0];
        const canvasCtx = canvasElement.getContext('2d');
        // canvasCtx.font = "30px Comic Sans MS";
        // canvasCtx.fillStyle = "yellow";
    
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.strokeStyle = "#00ff00";
        canvasCtx.lineWidth = 5;
        canvasCtx.strokeRect(0.3*global.full_canvas.width, 0.1*global.full_canvas.height, 0.4*global.full_canvas.width, 0.8*global.full_canvas.height);

        if (global.detectionNeeded && results.multiFaceLandmarks) {
            if(results.multiFaceLandmarks.length==0){
                canvasCtx.lineWidth = 5;
                canvasCtx.strokeStyle = "#ff0000";
                canvasCtx.strokeRect(0.3*global.full_canvas.width, 0.1*global.full_canvas.height, 0.4*global.full_canvas.width, 0.8*global.full_canvas.height);
            }

              for (const landmarks of results.multiFaceLandmarks) {

                const face_height = landmarks[152].y-landmarks[10].y;
                // drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#30FF30'});
                // drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                //  {color: '#30FF30', lineWidth: 1});
                             
                const vertices = FACEMESH_FACE_OVAL.flatMap(num => num);
                const oval_size = calcPolygonArea(landmarks, vertices);
                // canvasCtx.fillText(oval_size, global.full_canvas.width/2, global.full_canvas.height/4);
                const left_eye_vertices = FACEMESH_LEFT_EYE.flatMap(num => num);
                const right_eye_vertices = FACEMESH_RIGHT_EYE.flatMap(num => num);
                const eye_sizes = (calcPolygonArea(landmarks, left_eye_vertices) + calcPolygonArea(landmarks, right_eye_vertices))/2;
                const ratio = 100*100*(eye_sizes/oval_size);
                
                const ratio2 = Math.round(100*calcratio2(landmarks));
                // console.log(ratio2);
                canvasCtx.fillStyle = "#ffffff";
                canvasCtx.font = "30px Verdana";


                // canvasCtx.fillText(ratio2, global.full_canvas.width/2, global.full_canvas.height/2);

                global.eye_data.push({t: new Date().getTime(), ratio2});

                if (landmarks[33].x<0.31 || landmarks[263].x>0.69 || 
                    landmarks[33].y<0.21 || landmarks[263].y<0.21 ||
                    landmarks[33].x>0.79 || landmarks[263].x>0.79){
                    canvasCtx.strokeStyle = "#ff0000";
                    canvasCtx.strokeRect(0.3*global.full_canvas.width, 0.1*global.full_canvas.height, 0.4*global.full_canvas.width, 0.8*global.full_canvas.height);
                }
                // canvasCtx.fillStyle = "#ffffff";
                // canvasCtx.font = "20px";

                // // left (385-380) + (387-373)/ (362-263)
                
                // // right (160-144) + (158-153) / (33-133)
                
                // console.log(right_eye_vertices);
                // const vals = [33, 263];
                // for (let i = 0; i < right_eye_vertices.length-1; i++) {
                //     var point0 = landmarks[right_eye_vertices[i]];
                //     var x = point0.x;
                //     var y = point0.y;
                //     canvasCtx.fillText(right_eye_vertices[i], x*global.full_canvas.width, y*global.full_canvas.height);
                // }

                // for (let i = 0; i < left_eye_vertices.length-1; i++) {
                //     var point0 = landmarks[left_eye_vertices[i]];
                //     var x = point0.x;
                //     var y = point0.y;
                //     canvasCtx.fillText(left_eye_vertices[i], x*global.full_canvas.width, y*global.full_canvas.height);
                // }

                // const vals = [385, 380, 387, 373, 362, 263, 160, 144, 158, 153, 33, 133];

                // for (let i = 0; i < vals.length; i++) {
                //     var point0 = landmarks[vals[i]];
                //     var x = point0.x;
                //     var y = point0.y;
                //     canvasCtx.fillText(vals[i], x*global.full_canvas.width, y*global.full_canvas.height);
                // }
                // canvasCtx.fillText("eyes: " + Math.round(1000*eye_sizes) + ", oval: " +Math.round(1000*oval_size), global.full_canvas.width/3, global.full_canvas.height/5);


                // if (face_height>0.4){
                //     drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#FF3030'});
                //     drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                //              {color: '#FF3030', lineWidth: 1});
    
                // }
                // if (ratio<10){
                //     // canvasCtx.fillText("Blink! " /*+ 100*100*(eye_sizes/oval_size)*/, global.full_canvas.width/2, global.full_canvas.height/6);

                //     drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#FFFFFF'});
                //     // drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {color: '#FFFFFF', lineWidth: 1});
                // }                
    
                // drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
    
                // drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#FF3030'});
            }
        }
      canvasCtx.restore();
    }


}
    function pythagoras(pointA, pointB){
      return Math.sqrt(Math.pow(pointA.x-pointB.x, 2) + Math.pow(pointA.y-pointB.y, 2));
    }
    function calcratio2(landmarks) {
        var left = (pythagoras(landmarks[385], landmarks[380])+pythagoras(landmarks[387], landmarks[373]))/(2*pythagoras(landmarks[362], landmarks[263]));
        var right = (pythagoras(landmarks[160], landmarks[144])+pythagoras(landmarks[158], landmarks[153]))/(2*pythagoras(landmarks[33], landmarks[133]));
        return 0.5*(left+right);
    // left (385-380) + (387-373)/ (362-263)
                
    // right (160-144) + (158-153) / (33-133)

       
    }


    function calcPolygonArea(landmarks, vertices) {
        var total = 0;
    
        for (var i = 0, l = vertices.length; i < l; i++) {
          var addX = landmarks[vertices[i]].x;
          var addY = landmarks[vertices[i == vertices.length - 1 ? 0 : i + 1]].y;
          var subX = landmarks[vertices[i == vertices.length - 1 ? 0 : i + 1]].x;
          var subY = landmarks[vertices[i]].y;
    
          total += (addX * addY * 0.5);
          total -= (subX * subY * 0.5);
        }
    
        return 1000*Math.abs(total);
    }

    function get_all(global) {
        return global.eye_data;
    }

    function start_recording(global) {
        global.detectionNeeded = true;
        global.eye_data = [];
    }
    function stop_recording(global) {
        global.detectionNeeded = false;
    }

    function stop_video(global) {
        global.stop_me = true;
        // console.log('bang!');
        global.detectionNeeded = false;
        document.body.removeChild(global.container);
        global.camera.stop();
        global.camera = false;

        // global.facemesh = false;
        // global.facemesh2 = false;
        global.minno_mesh = false;

    
    }

    
    
