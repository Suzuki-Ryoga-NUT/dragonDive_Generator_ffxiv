function doGet(e) {
  pageName = e.parameter.page;
  if (!pageName){
    pageName = "dragonDive";
  }

  const htmlOutput = HtmlService.createTemplateFromFile(pageName).evaluate();
  //set properties
  switch(pageName){
    case "dragonDive":
      htmlOutput.setTitle('堕天のドラゴンダイブじぇねれーた');
      break;
    case "fourTower":
      htmlOutput.setTitle('4塔じぇねれーた');
      break;
    default:
      break;
  }
  return htmlOutput;
}

function configureBuff(){
  var diceBuffList = shuffle([0, 0, 0, 1, 1, 2, 2, 2]);
  var jumpBuffList = Array(diceBuffList.length);
  jumpBuffList.fill(-1);

  var diceIdx = Array(3);
  for (i = 0; i < 3; i++){
    diceIdx[i] = diceBuffList.flatMap((s, j) => ( s === i ? j : []));
  }

  for (i = 0; i < 3; i++){
    if ( i == 1 ){
      var tmpJumpBuff = shuffle([1, 2]);
    }else{
      var tmpJumpBuff = shuffle([0, 1, 2]);
    }

    if (Math.random() >= 0.5){
      tmpJumpBuff.fill(0);  //all high jump
    }

    for (k = 0; k < diceIdx[i].length; k++){
      jumpBuffList[diceIdx[i][k]] = tmpJumpBuff[k];
    }
  }

  var sendJsonMsg = JSON.stringify([diceBuffList, jumpBuffList]);
  Logger.log(sendJsonMsg);
  return sendJsonMsg;
}

function shuffle(array){
  for(var i = array.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
  }
  return array;
}

function getAppUrl(){
  return ScriptApp.getService().getUrl();
}
