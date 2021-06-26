var start_dashes = {
    "0":{
      layout:{x: 5, y: 0, w: 3, h: 2, minW: 2, maxW: 4}, type:"image", metaData:{filePath:"./bgsu.png"}, innerData:[]
    },
    "1":{
      layout:{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}, type:"text", 
        metaData:{style:"h1", text:"I am a <b>realy</b> simple dash"}, innerData:[]
    },
    "2":{
      layout:{x: 2, y: 0, w: 3, h: 7}, type:"plotly", 
      metaData: {file_name:"./table.txt", type:"bar"}, 
      innerData:[]
    },
    "3":{
      layout:{x: 2, y: 0, w: 1, h: 1}, type:"probe", 
      metaData: {info:"info"}, 
      innerData:[]
    },
}

export default start_dashes;


