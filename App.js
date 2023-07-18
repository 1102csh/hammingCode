import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import IDSEL from './components/IDSEL';

export default function App() {

  // 화면 출력을 위한 각 열, let 으로 하고 싶은데 그렇게하면 출력이 안되길래 일단 이렇게 설정
  const [row0,setRow0] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row1,setRow1] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row2,setRow2] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row3,setRow3] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row4,setRow4] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row5,setRow5] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row6,setRow6] = useState([0,0,0,0,0,0,0,0,"??"]);
  const [row7,setRow7] = useState([0,0,0,0,0,0,0,0,"??"]);

  // 코딩 실력 부족으로 인한 합의점
  let tempRow0 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow1 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow2 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow3 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow4 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow5 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow6 = [0,0,0,0,0,0,0,0,"??"];
  let tempRow7 = [0,0,0,0,0,0,0,0,"??"];

  const [serialNumber,setSerialNumber] =  useState("");
  const [codeNumber,setCodeNumber] =  useState("");

  let BINserial;  // 시리얼코드 이진수 변수
  let BINcode;    // 타입코드 이진수 변수

  // 전체적인 관리를 위한 표 배열 8x8
  let chart = [[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1]];

  let chart1400 = [[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1]];
  let selectedMode = "1600";
  const [isVisible,setIsVisible] = useState(true);
  const [btn,setBtn] = useState(2);

  // 10진수 -> 2진수 변환 함수 ( 16진수 -> 2진수 변환함수 따로 만들기 귀찮아서 안에 포함시킴 )
  const DEC2BIN = (DEC) => {

    // 만약 입력된 값이 10진수가 아니라 16진수라면
    if(DEC == "a" || DEC == "A" || DEC == "b" || DEC == "B" || DEC == "c" || DEC == "C" || DEC == "d" || DEC == "D" || DEC == "e" || DEC == "E" || DEC == "f" || DEC == "F"){

      let result;
      switch(DEC){  // 8421
        case "a":
        case "A":
          result = "1010";         
          break;
        case "b":
        case "B":
          result = "1011";         
          break;
        case "c":
        case "C":
          result = "1100";         
          break;
        case "d":
        case "D":
          result = "1101";         
          break;
        case "e":
        case "E":
          result = "1110";         
          break;
        case "f":
        case "F":
          result = "1111";         
          break;
      }

      return result;
    }
    else{
      let result = (DEC >>> 0).toString(2);
      let temp = (4-(result.length%4));
      let addZero = "";

      if(temp!=0 && temp!=4){
        for(let i=0;i<temp;i++){
          addZero += "0";
        }
      }

      return addZero + result
    }
  }
  
  // 2진수 -> 10진수 변환 함수 
  const BIN2DEC = (BIN) => {
    let temp1 = parseInt(BIN[0])*8;
    let temp2 = parseInt(BIN[1])*4;
    let temp3 = parseInt(BIN[2])*2;
    let temp4 = parseInt(BIN[3])*1;

    return (temp1+temp2+temp3+temp4);
  }

  // 프로그램 실행 함수
  const inputChart = () => {

    if((serialNumber!=""&&codeNumber!="")&&(serialNumber.length>4&&codeNumber.length>3)&&(serialNumber[0]!=0)){
      chart = [[],[],[],[],[],[],[],[]];

      // 눌린 버튼 UI 변화 처리
      switch(selectedMode){
        case "1400":
          setBtn(1);
          break;
        case "1600":
          setBtn(2);
          break;
        case "1900":
          setBtn(3);
          break;
        case "i2154":
          setBtn(4);
          break;
      }

      // 각 자리 숫자가 16진수인 코드넘버는 16->2 로 십진수로 작성된 시리얼넘버는 10->2로 진수변환
      BINcode = DEC2BIN(codeNumber[0])+DEC2BIN(codeNumber[1])+DEC2BIN(codeNumber[2])+DEC2BIN(codeNumber[3]);
      BINserial = DEC2BIN(serialNumber)

      if(selectedMode!="1400"){
        setIsVisible(true);
        // 차트에 대입
        let j=0;
        for(let i=8;i<16;i++){
          chart[j][0] = BINserial[i];
          chart[j][2] = BINcode[i];

          //alert(BINcode[i]);
          j++
        }

        for(let i=0;i<8;i++){
          chart[i][1] = BINserial[i];
          chart[i][3] = BINcode[i];
        }

        // 1600, 1900, i2154는 cal_chart를 통해 한번에 계산
        cal_chart(selectedMode);
      }
      else if(selectedMode=="1400"){
        setIsVisible(false);
        cal_1400();
      }

      updateOutput();
    }
  };

  const cal_1400 = () => {
    for(let i=0;i<16;i++){
      if(i<8){
        chart1400[0][i] = BINcode[i];
        chart1400[2][i] = BINserial[i];
      }
      else{
        chart1400[1][i-8] = BINcode[i];
        chart1400[3][i-8] = BINserial[i];
      }
    }

    let temp = 0;
    for(let i=4;i<8;i++){
      temp = temp + parseInt(chart1400[0][i]);
    }
    if(temp%2==0) chart1400[0][0] = 1;

    for(let i=1;i<=3;i++){
      temp = 0;
      for(let j=0;j<8;j++){
        temp = temp + parseInt(chart1400[i][j]);
      }
      if(temp%2==0) chart1400[0][i] = 1;
    }

    chart[0] = chart1400[0];
    chart[1] = chart1400[1];
    chart[2] = chart1400[2];
    chart[3] = chart1400[3];

    updateChart();

    const convert_hex = (row) => {
      //alert("row : "+row[0]+row[1]+row[2]+row[3]+row[4]+row[5]+row[6]+row[7]+row[8])
      let temp1 = BIN2DEC(row[0].toString()+row[1].toString()+row[2].toString()+row[3].toString());
      let temp2 = BIN2DEC(row[4].toString()+row[5].toString()+row[6].toString()+row[7].toString());

      temp1 = temp1.toString();
      temp2 = temp2.toString();
      //alert("temp1 : "+temp1+" / temp2 : "+temp2);
      switch(temp1){
        case "10":
          temp1 = "A";
          break;
        case "11":
          temp1 = "B";
          break;
        case "12":
          temp1 = "C";
          break;
        case "13":
          temp1 = "D";
          break;
        case "14":
          temp1 = "E";
          break;
        case "15":
          temp1 = "F";
          break;
      }

      switch(temp2){
        case "10":
          temp2 = "A";
          break;
        case "11":
          temp2 = "B";
          break;
        case "12":
          temp2 = "C";
          break;
        case "13":
          temp2 = "D";
          break;
        case "14":
          temp2 = "E";
          break;
        case "15":
          temp2 = "F";
          break;
      }

      return temp1+temp2;
    }

    chart[0][8] = convert_hex(tempRow0);
    chart[1][8] = convert_hex(tempRow1);
    chart[2][8] = convert_hex(tempRow2);
    chart[3][8] = convert_hex(tempRow3);

    updateChart();
  }

  // 16진수 계산해서 각 열 마지막 배열에 대입
  const cal_hex = () => {
    const convert_hex = (row) => {
      //alert("row : "+row[0]+row[1]+row[2]+row[3]+row[4]+row[5]+row[6]+row[7]+row[8])
      let temp1 = BIN2DEC(row[0].toString()+row[1].toString()+row[2].toString()+row[3].toString());
      let temp2 = BIN2DEC(row[4].toString()+row[5].toString()+row[6].toString()+row[7].toString());

      temp1 = temp1.toString();
      temp2 = temp2.toString();
      //alert("temp1 : "+temp1+" / temp2 : "+temp2);
      switch(temp1){
        case "10":
          temp1 = "A";
          break;
        case "11":
          temp1 = "B";
          break;
        case "12":
          temp1 = "C";
          break;
        case "13":
          temp1 = "D";
          break;
        case "14":
          temp1 = "E";
          break;
        case "15":
          temp1 = "F";
          break;
      }

      switch(temp2){
        case "10":
          temp2 = "A";
          break;
        case "11":
          temp2 = "B";
          break;
        case "12":
          temp2 = "C";
          break;
        case "13":
          temp2 = "D";
          break;
        case "14":
          temp2 = "E";
          break;
        case "15":
          temp2 = "F";
          break;
      }

      return temp1+temp2;
    }

    chart[0][8] = convert_hex(tempRow0);
    chart[1][8] = convert_hex(tempRow1);
    chart[2][8] = convert_hex(tempRow2);
    chart[3][8] = convert_hex(tempRow3);
    chart[4][8] = convert_hex(tempRow4);
    chart[5][8] = convert_hex(tempRow5);
    chart[6][8] = convert_hex(tempRow6);
    chart[7][8] = convert_hex(tempRow7);

    updateChart();
  }

  const cal_chart = () => {
    groupCal(7);
    groupCal(6);
    groupCal(5);
    groupCal(4);
    groupCal(3);
    groupCal(2);
    groupCal(1);
    groupCal(0);

    const convert_1600 = (col) => {

      let convert = [];

      for(let i=0;i<8;i++){
        convert.push(chart[i][col]);
      }
      
      return convert;
    }
    let convert0 = convert_1600(7);
    let convert1 = convert_1600(6);
    let convert2 = convert_1600(5);
    let convert3 = convert_1600(4);
    let convert4 = convert_1600(3);
    let convert5 = convert_1600(2);
    let convert6 = convert_1600(1);
    let convert7 = convert_1600(0);

    if(selectedMode == "1600"){
      chart[0] = convert0;
      chart[1] = convert1;
      chart[2] = convert2;
      chart[3] = convert3;
      chart[4] = convert4;
      chart[5] = convert5;
      chart[6] = convert6;
      chart[7] = convert7;
    }
    else if(selectedMode == "1900"){
      chart[0] = convert0;
      chart[1] = convert1;
      chart[2] = convert4;
      chart[3] = convert5;
      chart[4] = convert2;
      chart[5] = convert3;
      chart[6] = convert6;
      chart[7] = convert7;
    }
    else if(selectedMode == "i2154"){
      let fixedVal;
      let reversed;

      chart[0] = convert0;
      fixedVal = chart[0][8];
      reversed = chart[0].slice(0,8).reverse();
      chart[0] = [...reversed,fixedVal];

      chart[1] = convert1;
      chart[2] = convert2;
      fixedVal = chart[2][8];
      reversed = chart[2].slice(0,8).reverse();
      chart[2] = [...reversed,fixedVal];
      
      chart[3] = convert3;
      chart[4] = convert4;
      fixedVal = chart[4][8];
      reversed = chart[4].slice(0,8).reverse();
      chart[4] = [...reversed,fixedVal];

      chart[5] = convert5;
      chart[6] = convert6;
      fixedVal = chart[6][8];
      reversed = chart[6].slice(0,8).reverse();
      chart[6] = [...reversed,fixedVal];

      chart[7] = convert7;
    }
    
    updateChart();
    cal_hex();
  }

  const updateChart = () => {
    tempRow0 = chart[0];
    tempRow1 = chart[1];
    tempRow2 = chart[2];
    tempRow3 = chart[3];
    tempRow4 = chart[4];
    tempRow5 = chart[5];
    tempRow6 = chart[6];
    tempRow7 = chart[7];
  }
  const updateOutput = () => {
    setRow0(chart[0]);
    setRow1(chart[1]);
    setRow2(chart[2]);
    setRow3(chart[3]);
    setRow4(chart[4]);
    setRow5(chart[5]);
    setRow6(chart[6]);
    setRow7(chart[7]);
  }

  const groupCal = (startPoint) => {
    let row = [];
    let i = startPoint;
    let j = 0;
    for(let k=0;k<4;k++){
      row[k] =  chart[i][j];

      //alert("i = "+i+" / j = "+j+" / value = "+chart[i][j]);
      j++;
      i--;

      if(i<0) i=7;
    }
    let temp0 = parseInt(row[0]);
    let temp1 = parseInt(row[1]);
    let temp2 = parseInt(row[2]);
    let temp3 = parseInt(row[3]);

    //alert("row : "+row);
    let H_A_0 = (temp0+temp1+temp3)%2==0 ? 1 : 0;
    let H_A_1 = (temp0+temp2+temp3)%2==0 ? 1 : 0;
    let H_A_2 = (temp1+temp2+temp3)%2==0 ? 1 : 0;
    let H_A_P = (temp0+temp1+temp2+temp3+H_A_0+H_A_1+H_A_2)%2==0 ? 1 : 0;

    row = [H_A_0,H_A_1,H_A_2,H_A_P];
    //alert(temp0+temp1+temp2+temp3+H_A_0+H_A_1+H_A_2)
    //alert("BEFORE HA0 : "+(temp0+temp1+temp3)+" / HA1 : "+(temp0+temp2+temp3)+" / HA2 : "+(temp1+temp2+temp3));
    //alert("AFTER HA0 : "+H_A_0+" / HA1 : "+H_A_1+" / HA2 : "+H_A_2);
    /*
    let H_A_0 = [rowA[0],rowA[1],"",rowA[3]];
    let H_A_1 = [rowA[0],"",rowA[2],rowA[3]];
    let H_A_2 = ["",rowA[1],rowA[2],rowA[3]];
    */

    for(let k=0;k<4;k++){
      chart[i][j] = row[k];

      j++;
      i--;
      
      if(i<0) i=7;
    }

    updateChart();
    //alert(chart[3][4]+"/"+chart[2][5]+"/"+chart[1][6]+"/"+chart[0][7])
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>

        <Text style={styles.text}>Code Number : </Text>
        <TextInput 
          style = {styles.textInput}
          value = {codeNumber}
          onChangeText = {(value)=>{
            setCodeNumber(value)
          }}
        ></TextInput>

        <Text style={styles.text}>Serial Number : </Text>
          <TextInput 
            style = {styles.textInput}
            value = {serialNumber}
            onChangeText = {(value)=>{
              setSerialNumber(value)
            }}
          ></TextInput>
          
        <TouchableOpacity 
          style = {styles.btn}
          onPress = {()=>{
            inputChart();
          }}
        >
          <Text style={{color:"green",fontSize:25,fontWeight:"bold"}}>계산 실행</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modeContainer}>
        <TouchableOpacity 
          style={[styles.mode, btn==1&&styles.modeActive]}
          onPress = {()=>{
            setIsVisible(false);
            selectedMode = "1400";
            inputChart();
          }}
        >
          <Text style={[styles.modeLabel, btn==1&&styles.modeActiveLabel]}>1400</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mode, btn==2&&styles.modeActive]}
          onPress = {()=>{
            setIsVisible(true);
            selectedMode = "1600";
            inputChart();
          }}
        >
          <Text style={[styles.modeLabel, btn==2&&styles.modeActiveLabel]}>1600</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mode, btn==3&&styles.modeActive]}
          onPress = {()=>{
            setIsVisible(true);
            selectedMode = "1900";
            inputChart();
          }}
        >
          <Text style={[styles.modeLabel, btn==3&&styles.modeActiveLabel]}>1900</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mode, btn==4&&styles.modeActive]}
          onPress = {()=>{
            setIsVisible(true);
            selectedMode = "i2154";
            inputChart();
          }}
        >
          <Text style={[styles.modeLabel, btn==4&&styles.modeActiveLabel]}>i2154</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.IDDT}>
        <Text style={styles.IDDTTEXT}>구분</Text>
        <Text style={styles.IDDTTEXT}>IDDT7</Text>
        <Text style={styles.IDDTTEXT}>IDDT6</Text>
        <Text style={styles.IDDTTEXT}>IDDT5</Text>
        <Text style={styles.IDDTTEXT}>IDDT4</Text>
        <Text style={styles.IDDTTEXT}>IDDT3</Text>
        <Text style={styles.IDDTTEXT}>IDDT2</Text>
        <Text style={styles.IDDTTEXT}>IDDT1</Text>
        <Text style={styles.IDDTTEXT}>IDDT0</Text>
        <Text style={styles.IDDTTEXT}>HEX</Text>
      </View>

      <View style={isVisible ? styles.hidden : styles.visible}>
        <IDSEL
          col0 = {row0[0]}
          col1 = {row0[1]}
          col2 = {row0[2]}
          col3 = {row0[3]}
          col4 = {row0[4]}
          col5 = {row0[5]}
          col6 = {row0[6]}
          col7 = {row0[7]}
          hex = {row0[8]}
          num = {3}
        />
        <IDSEL
          col0 = {row1[0]}
          col1 = {row1[1]}
          col2 = {row1[2]}
          col3 = {row1[3]}
          col4 = {row1[4]}
          col5 = {row1[5]}
          col6 = {row1[6]}
          col7 = {row1[7]}
          hex = {row1[8]}
          num = {2}
        />
        <IDSEL
          col0 = {row2[0]}
          col1 = {row2[1]}
          col2 = {row2[2]}
          col3 = {row2[3]}
          col4 = {row2[4]}
          col5 = {row2[5]}
          col6 = {row2[6]}
          col7 = {row2[7]}
          hex = {row2[8]}
          num = {1}
        />
        <IDSEL
          col0 = {row3[0]}
          col1 = {row3[1]}
          col2 = {row3[2]}
          col3 = {row3[3]}
          col4 = {row3[4]}
          col5 = {row3[5]}
          col6 = {row3[6]}
          col7 = {row3[7]}
          hex = {row3[8]}
          num = {0}
        />
      </View>

      <View style={isVisible ? styles.visible : styles.hidden}>
      <IDSEL
        col0 = {row0[0]}
        col1 = {row0[1]}
        col2 = {row0[2]}
        col3 = {row0[3]}
        col4 = {row0[4]}
        col5 = {row0[5]}
        col6 = {row0[6]}
        col7 = {row0[7]}
        hex = {row0[8]}
        num = {7}
      />
      <IDSEL
        col0 = {row1[0]}
        col1 = {row1[1]}
        col2 = {row1[2]}
        col3 = {row1[3]}
        col4 = {row1[4]}
        col5 = {row1[5]}
        col6 = {row1[6]}
        col7 = {row1[7]}
        hex = {row1[8]}
        num = {6}
      />
      <IDSEL
        col0 = {row2[0]}
        col1 = {row2[1]}
        col2 = {row2[2]}
        col3 = {row2[3]}
        col4 = {row2[4]}
        col5 = {row2[5]}
        col6 = {row2[6]}
        col7 = {row2[7]}
        hex = {row2[8]}
        num = {5}
      />
      <IDSEL
        col0 = {row3[0]}
        col1 = {row3[1]}
        col2 = {row3[2]}
        col3 = {row3[3]}
        col4 = {row3[4]}
        col5 = {row3[5]}
        col6 = {row3[6]}
        col7 = {row3[7]}
        hex = {row3[8]}
        num = {4}
      />
      <IDSEL
        col0 = {row4[0]}
        col1 = {row4[1]}
        col2 = {row4[2]}
        col3 = {row4[3]}
        col4 = {row4[4]}
        col5 = {row4[5]}
        col6 = {row4[6]}
        col7 = {row4[7]}
        hex = {row4[8]}
        num = {3}
      />
      <IDSEL
        col0 = {row5[0]}
        col1 = {row5[1]}
        col2 = {row5[2]}
        col3 = {row5[3]}
        col4 = {row5[4]}
        col5 = {row5[5]}
        col6 = {row5[6]}
        col7 = {row5[7]}
        hex = {row5[8]}
        num = {2}
      />
      <IDSEL
        col0 = {row6[0]}
        col1 = {row6[1]}
        col2 = {row6[2]}
        col3 = {row6[3]}
        col4 = {row6[4]}
        col5 = {row6[5]}
        col6 = {row6[6]}
        col7 = {row6[7]}
        hex = {row6[8]}
        num = {1}
      />
      <IDSEL
        col0 = {row7[0]}
        col1 = {row7[1]}
        col2 = {row7[2]}
        col3 = {row7[3]}
        col4 = {row7[4]}
        col5 = {row7[5]}
        col6 = {row7[6]}
        col7 = {row7[7]}
        hex = {row7[8]}
        num = {0}
      />
      </View>
      <Text> Code : {codeNumber} / CodeBIN : {DEC2BIN(codeNumber[0])}{DEC2BIN(codeNumber[1])}{DEC2BIN(codeNumber[2])}{DEC2BIN(codeNumber[3])}</Text>
      <Text> Serial : {serialNumber} SerialBIN : {DEC2BIN(serialNumber)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: "black"
  },
  inputContainer : {
    marginTop: 50,
    marginLeft: 10
  },
  text : {
    fontWeight : "bold",
    color: "green",
    fontSize : 20,
    marginBottom : 10
  },
  textInput : {
    borderBottomWidth : 1,
    borderBottomColor : "lightgray",
    borderRadius : 15,
    backgroundColor : "yellow",
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    width: "90%",
    marginBottom : 10,
    marginLeft : 10,
    paddingLeft : 10,
    paddingRight : 10
  },
  btn : {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 15,
    justifyContent: "center",
    alignItems : "center",
    width: "98%",
    height: 50,
    marginTop : 10,
    marginBottom : 20,
    backgroundColor : "black",
  },
  IDDT : {
    flexDirection : "row",
    marginLeft: 4,
  },
  IDDTTEXT : {
    color: "green",
    width:30,
    marginLeft:10,
    fontSize: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modeContainer : {
    width: "100%",
    height: 60,
    marginBottom: 30,
    flexDirection: "row"
  },
  mode : {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    width: 90,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modeLabel : {
    color: "green",
    fontSize: 20,
    fontWeight: "bold"
  },
  modeActive : {
    backgroundColor : "green",
  },
  modeActiveLabel : {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  visible : {
    display : "flex"
  },
  hidden : {
    display : "none"
  }
});
