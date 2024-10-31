 function NotePad() {
    return (
        <div className="notepad">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="85px"
            height="85px"
            viewBox="0 0 56.9 80.4"
            style={{ enableBackground: "new 0 0 56.9 80.4" }}
            xmlSpace="preserve"
          >
            <style type="text/css">
              {`
                .path {
                  stroke-dasharray: 1000;
                  animation: dash 5s linear infinite;
                  animation-fill-mode: forwards;
                }
                @keyframes dash {
                  from {
                    stroke-dashoffset: 1000;
                  }
                  to {
                    stroke-dashoffset: 0;
                  }
                }
              `}
            </style>
            <path
              stroke="#000"
              strokeWidth="1.5px"
              fill="none"
              d="M28.1,0.5C28.2,0.5,28.2,0.5,28.1,0.5c0.1,0,0.1,0,0.1,0H28.1z"
            />
            <path
              stroke="#000"
              strokeWidth="1.5px"
              fill="#000"
              d="M39.7,8c0,0-0.3-7.4-11.5-7.5C17.1,0.6,16.7,8,16.7,8C2.6,6.5,3,20,3,20h24.3h1.9h24.3C53.4,20,53.8,6.5,39.7,8 z M28.2,17c-2.8,0-5-2.4-5-5.3c0-2.9,2.3-5.3,5-5.3s5,2.4,5,5.3C33.2,14.6,31,17,28.2,17z"
            />
            <polyline
              className="path"
              stroke="#000"
              strokeWidth="1.75px"
              fill="none"
              points="11.2,34.7 20.2,35.5 21.6,25.8 27.4,42.3 29.4,32.3 33.3,37 34.8,30.8 37.3,35.3 45.1,35 "
            />
            <line stroke="#000" strokeWidth="1.5px" fill="none" x1="15.8" y1="50.9" x2="40.6" y2="50.9" />
            <line stroke="#000" fill="none" strokeWidth="1.5px" x1="17.7" y1="57.4" x2="38.7" y2="57.4" />
            <path
              stroke="#000"
              fill="none"
              d="M51.1,20.6v45.1c0,1.4-1.1,2.5-2.5,2.5H8.3c-1.4,0-2.5-1.1-2.5-2.5V20.6"
            />
            <path
              stroke="#000"
              fill="none"
              strokeWidth="2px"
              d="M53,14.1h1c1.2,0,2.2,1,2.2,2.2v61.1c0,1.2-1,2.2-2.2,2.2H3c-1.2,0-2.2-1-2.2-2.2V16.3c0-1.2,1-2.2,2.2-2.2h0.5 "
            />
          </svg>
        </div>
      );
    }

export  default NotePad;