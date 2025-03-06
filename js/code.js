/*
    작성되어있는 JS 코드는 모바일에서 사용하기 위해 html 파일에 <script>에 통째로 들어가있음
    코드 수정시 html 파일을 수정해야됨
*/
let Tnum = document.getElementById("type_number");
let Snum = document.getElementById("serial_number");
let BTnum = document.getElementById("binary_type"); //*
let BSnum = document.getElementById("binary_serial"); //*
let Tval;
let Sval;

let indexR=0;
let index=1;

function input_number(){
    // 함수 실행 전 결과 초기화
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let temp = document.getElementById("r"+i+","+j);
            temp.style.backgroundColor = 'black';
        }
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let temp = document.getElementById("r2"+i+","+j);
            temp.style.backgroundColor = 'black';
        }
    }
    for(let i=0;i<5;i++){
        for(let j=0;j<9;j++){
            let temp = document.getElementById("r3"+i+","+j);
            temp.style.backgroundColor = 'black';
        }
    }
    /*
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let sel = document.getElementById(i+","+j);
            sel.style.backgroundColor = 'aqua';
            sel.style.color = 'aqua';
        }
    }
    
    let get_value = document.getElementById("num");

    Tval = get_value.value[0]+get_value.value[1]+get_value.value[2]+get_value.value[3];
    Sval = get_value.value[4]+get_value.value[5]+get_value.value[6]+get_value.value[7]+get_value.value[8];
    */

    let get_value1 = document.getElementById("num1");
    let get_value2 = document.getElementById("num2");
    Tval = get_value1.value;
    Sval = get_value2.value;

    Tnum.innerText = "Type Input : " + Tval;
    Snum.innerText = "Serial Input : " + Sval;

    // 2진수 변환
    BTnum.innerText = "";
    BSnum.innerText = "";

    // Type number Convert
    for(let i=0;i<4;i++){   // 각 자리수 마다 반복
        Tval = Tval.toUpperCase(); // 소문자로 입력받던 대문자로 입력받던 대문자로 체크
        if(Tval[i]=="A"||Tval[i]=="B"||Tval[i]=="C"||Tval[i]=="D"||Tval[i]=="E"||Tval[i]=="F"){
            let cvt;
            switch(Tval[i]){
                case "A":
                    cvt = 10;
                    break;
                case "B":
                    cvt = 11;
                    break;
                case "C":
                    cvt = 12;
                    break;
                case "D":
                    cvt = 13;
                    break;
                case "E":
                    cvt = 14;
                    break;
                case "F":
                    cvt = 15;
                    break;
            }
            BTnum.innerText += cvt.toString(2);
        }
        else{
            if(parseInt(Tval[i]).toString(2).length<4){ 
                // 해당 자리수를 이진수로 변환했을때 4자리를 넘지 않는다면
                let temp = parseInt(Tval[i]).toString(2).length;
                for(let j=0;j<4-temp;j++){
                    BTnum.innerText += "0"; // 넘지 않는 자리 수 만큼 0을 출력
                }
            }

            BTnum.innerText += parseInt(Tval[i]).toString(2);   // 이진수로 변환한 값 출력
        }
    }
    // Serial number Convert
    if(parseInt(Sval).toString(2).length<16){
        let temp = parseInt(Sval).toString(2).length;
        for(let i=0;i<16-temp;i++){
            BSnum.innerText += "0";
        }
    }

    BSnum.innerText += parseInt(Sval).toString(2);

    input_chart();  // 입력한 값 표에 대입
    input_group();
    cal_hex();
    cal_1400();
    print_result();
}
function input_chart(){
    let count1=8;
    let count2=0;
    let count3=8;
    let count4=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let sel = document.getElementById("r"+i+","+j);
            if(j==1&&i!=0){
                sel.innerText = BSnum.textContent[count1];
                count1++;
            }
            if(j==2&&i!=0){
                sel.innerText = BSnum.textContent[count2];
                count2++;
            }
            if(j==3&&i!=0){
                sel.innerText = BTnum.textContent[count3];
                count3++;
            }
            if(j==4&&i!=0){
                sel.innerText = BTnum.textContent[count4];
                count4++;
            }
        }
    }
}
function input_group(){
    let groupName;
    let count=8;
    for(let i=1;i<=4;i++){
        switch(i){
            case 1:
                count=8;
                break;
            case 2:
                count=7;
                break;
            case 3:
                count=6;
                break;
            case 4:
                count=5;
                break;
        }
        for(let j=0;j<8;j++){
            switch(j){
                case 0:
                    groupName = "A";
                    break;
                case 1:
                    groupName = "B";
                    break;
                case 2:
                    groupName = "C";
                    break;
                case 3:
                    groupName = "D";
                    break;
                case 4:
                    groupName = "E";
                    break;
                case 5:
                    groupName = "F";
                    break;
                case 6:
                    groupName = "G";
                    break;
                case 7:
                    groupName = "H";
                    break;
            }
            document.getElementById(groupName+"0,"+i).innerText = document.getElementById("r"+count+","+i).textContent;
            count--;
            if(count<1){
                count=8;
            }
        }
    }

    for(let i=2;i<=4;i++){
        for(let j=0;j<8;j++){
            switch(j){
                case 0:
                    groupName = "A";
                    break;
                case 1:
                    groupName = "B";
                    break;
                case 2:
                    groupName = "C";
                    break;
                case 3:
                    groupName = "D";
                    break;
                case 4:
                    groupName = "E";
                    break;
                case 5:
                    groupName = "F";
                    break;
                case 6:
                    groupName = "G";
                    break;
                case 7:
                    groupName = "H";
                    break;
            }

            let val1;
            let val2;
            let val3;
            if(i==2){
                val1 = document.getElementById(groupName+"0,1").textContent;
                val2 =document.getElementById(groupName+"0,2").textContent;
                val3 =document.getElementById(groupName+"0,4").textContent;
                document.getElementById(groupName+i+",1").innerText = val1;
                document.getElementById(groupName+i+",2").innerText = val2;
                document.getElementById(groupName+i+",4").innerText = val3;

                let sum = parseInt(val1)+parseInt(val2)+parseInt(val3);
                if(sum%2==0){
                    document.getElementById(groupName+"2,5").innerText = "1";
                    document.getElementById(groupName+"0,5").innerText = "1";
                }
                else{
                    document.getElementById(groupName+"2,5").innerText = "0";
                    document.getElementById(groupName+"0,5").innerText = "0";
                }
            }
            if(i==3){
                val1 = document.getElementById(groupName+"0,1").textContent;
                val2 =document.getElementById(groupName+"0,3").textContent;
                val3 =document.getElementById(groupName+"0,4").textContent;
                document.getElementById(groupName+i+",1").innerText = val1;
                document.getElementById(groupName+i+",3").innerText = val2;
                document.getElementById(groupName+i+",4").innerText = val3;

                let sum = parseInt(val1)+parseInt(val2)+parseInt(val3);
                if(sum%2==0){
                    document.getElementById(groupName+"3,6").innerText = "1";
                    document.getElementById(groupName+"0,6").innerText = "1";
                }
                else{
                    document.getElementById(groupName+"3,6").innerText = "0";
                    document.getElementById(groupName+"0,6").innerText = "0";
                }
            }
            if(i==4){
                val1 = document.getElementById(groupName+"0,2").textContent;
                val2 =document.getElementById(groupName+"0,3").textContent;
                val3 =document.getElementById(groupName+"0,4").textContent;
                document.getElementById(groupName+i+",2").innerText = val1;
                document.getElementById(groupName+i+",3").innerText = val2;
                document.getElementById(groupName+i+",4").innerText = val3;

                let sum = parseInt(val1)+parseInt(val2)+parseInt(val3);
                if(sum%2==0){
                    document.getElementById(groupName+"4,7").innerText = "1";
                    document.getElementById(groupName+"0,7").innerText = "1";
                }
                else{
                    document.getElementById(groupName+"4,7").innerText = "0";
                    document.getElementById(groupName+"0,7").innerText = "0";
                }
            }

            let val=0;
            for(let x=1;x<=7;x++){
                val += parseInt(document.getElementById(groupName+"0,"+x).textContent);
            }
            if(val%2==0){
                document.getElementById(groupName+"5,8").innerText = "1";
                document.getElementById(groupName+"0,8").innerText = "1";
            }
            else{
                document.getElementById(groupName+"5,8").innerText = "0";
                document.getElementById(groupName+"0,8").innerText = "0";
            }
        }
    }

    console.log("clear");
    for(let i=5;i<=8;i++){
        switch(i){
            case 5:
                count=4;
                break;
            case 6:
                count=3;
                break;
            case 7:
                count=2;
                break;
            case 8:
                count=1;
                break;
        }
        for(let j=0;j<8;j++){
            switch(j){
                case 0:
                    groupName = "A";
                    break;
                case 1:
                    groupName = "B";
                    break;
                case 2:
                    groupName = "C";
                    break;
                case 3:
                    groupName = "D";
                    break;
                case 4:
                    groupName = "E";
                    break;
                case 5:
                    groupName = "F";
                    break;
                case 6:
                    groupName = "G";
                    break;
                case 7:
                    groupName = "H";
                    break;
            }
            document.getElementById("r"+count+","+i).innerText = document.getElementById(groupName+"0,"+i).textContent;
            count--;
            if(count<1){
                count=8;
            }
        }
    }
    console.log("All clear");
}

//parseInt(temp,2).toString(16);
function cal_hex(){
    for(let i=1;i<=8;i++){
        let sum1=0;
        let sum2=0;
        for(let j=1;j<=8;j++){
            let temp;
            if(j<5){
                let val = document.getElementById("r"+j+","+i).textContent;

                sum1 = sum1 + val;
                
                //document.getElementById("r9,"+i).innerText = parseInt(sum1,2).toString(16);    
            }
            if(j==4){
                sum1 = parseInt(sum1,2).toString(16);
            }
            if(j>=5){
                let val = document.getElementById("r"+j+","+i).textContent;

                sum2 = sum2 + val;
                
                //document.getElementById("r9,"+i).innerText = parseInt(sum2,2).toString(16);
            }
            if(j==8){
                sum2 = parseInt(sum2,2).toString(16);
            }
            temp = sum1+sum2;
            temp = temp.toUpperCase();
            document.getElementById("r"+(9-i)+",9").innerText = temp; 
        }
    }
}
function cal_1900(){
    for(let i=0;i<9;i++){
        for(let j=0;j<10;j++){
            let temp = document.getElementById("r"+i+","+j);
            let cpy = document.getElementById("r2"+i+","+j);

            cpy.innerText = temp.textContent;
        }
    }

    //3 5 스왑
    for(let i=1;i<10;i++){
        let temp = document.getElementById("r23,"+i).textContent;
        document.getElementById("r23,"+i).innerText = document.getElementById("r25,"+i).textContent;
        document.getElementById("r25,"+i).innerText = temp;
    }
    for(let i=1;i<10;i++){
        let temp = document.getElementById("r24,"+i).textContent;
        document.getElementById("r24,"+i).innerText = document.getElementById("r26,"+i).textContent;
        document.getElementById("r26,"+i).innerText = temp;
    }
}
function cal_1400(){
    //BTnum - Binary Type Number
    //BSnum - Binary Serial Number

    let count = 0;
    for(let i=1;i<=2;i++){
        for(let j=1;j<=8;j++){
            let temp = document.getElementById("r3"+i+","+j);
            temp.innerText = BTnum.textContent[count];
            count++;
        }
    }
    count=0;
    for(let i=3;i<=4;i++){
        for(let j=1;j<=8;j++){
            let temp = document.getElementById("r3"+i+","+j);
            temp.innerText = BSnum.textContent[count];
            count++;
        }
    }

    let sum=0;
    for(let j=5;j<=8;j++){
        let temp = document.getElementById("r31,"+j).textContent;
        sum += parseInt(temp);
    }
    if(sum%2==0){
        document.getElementById("r31,1").innerText = 1;
    }

    sum=0;
    for(let j=1;j<=8;j++){
        let temp = document.getElementById("r32,"+j).textContent;
        sum += parseInt(temp);
    }
    if(sum%2==0){
        document.getElementById("r31,2").innerText = 1;
    }

    sum=0;
    for(let j=1;j<=8;j++){
        let temp = document.getElementById("r33,"+j).textContent;
        sum += parseInt(temp);
    }
    if(sum%2==0){
        document.getElementById("r31,3").innerText = 1;
    }

    sum=0;
    for(let j=1;j<=8;j++){
        let temp = document.getElementById("r34,"+j).textContent;
        sum += parseInt(temp);
    }
    if(sum%2==0){
        document.getElementById("r31,4").innerText = 1;
    }

    for(let i=1;i<=4;i++){
        sum=0;
        let sum2=0;
        for(let j=1;j<=8;j++){
            let temp;

            if(j<5){
                let val = document.getElementById("r3"+i+","+j).textContent;

                sum = sum+val;
            }
            if(j==4){
                sum = parseInt(sum,2).toString(16);
            }
            if(j>=5){
                let val = document.getElementById("r3"+i+","+j).textContent;

                sum2 = sum2+val;
            }
            if(j==8){
                sum2 = parseInt(sum2,2).toString(16);
            }
            
            temp = sum+sum2;
            temp = temp.toUpperCase();
            document.getElementById("r3"+i+",9").innerText = temp; 
        }
    }

    for(let i=1;i<=4;i++){
        for(let j=1;j<=8;j++){
            let temp = document.getElementById("r3"+i+","+j);
            
            if(temp.textContent==0){
                temp.style.backgroundColor = "aqua";
                temp.style.color = "aqua";
            }
            else if(temp.textContent==1){
                temp.style.backgroundColor = "red";
                temp.style.color = "red";
            }

        }
    }
}
function cal_hex_i2154(){
    for(let i=1;i<=8;i++){
        let sum1=0;
        let sum2=0;
        for(let j=1;j<=8;j++){
            let temp;
            if(j<5){
                let val = document.getElementById("r4"+i+","+j).textContent;

                sum1 = sum1 + val;
                
                //document.getElementById("r9,"+i).innerText = parseInt(sum1,2).toString(16);    
            }
            if(j==4){
                sum1 = parseInt(sum1,2).toString(16);
            }
            if(j>=5){
                let val = document.getElementById("r4"+i+","+j).textContent;

                sum2 = sum2 + val;
                
                //document.getElementById("r9,"+i).innerText = parseInt(sum2,2).toString(16);
            }
            if(j==8){
                sum2 = parseInt(sum2,2).toString(16);
            }
            temp = sum1+sum2;
            temp = temp.toUpperCase();
            document.getElementById("r4"+i+",9").innerText = temp; 
        }
    }
}
function print_result(){
    let arr = [8];
    for(let i=0;i<8;i++){
        arr[i] = [8];
        for(let j=0;j<8;j++){
            arr[i][j] = document.getElementById("r"+(i+1)+","+(j+1)).textContent;

        }
    }
    let output = [8];

    let x=7;
    for(let i=0;i<8;i++){
        let y=0;
        output[i] = [8];
        for(let j=0;j<8;j++){
            output[i][j] = arr[y][x];
            y++;
        }
        x--;
    }

    for(let i=1;i<=8;i++){
        for(let j=1;j<=8;j++){
            document.getElementById("r"+i+","+j).innerText = output[i-1][j-1];
        }
    }

    cal_1900();
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let temp = document.getElementById("r"+i+","+j);
            if(temp.textContent=="1"){
                temp.style.backgroundColor = 'red';
                temp.style.color = 'red';
            }
            else if(temp.textContent=="0"){
                temp.style.backgroundColor = 'aqua';
                temp.style.color = 'aqua';
            }
        }
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let temp = document.getElementById("r2"+i+","+j);
            if(temp.textContent=="1"){
                temp.style.backgroundColor = 'red';
                temp.style.color = 'red';
            }
            else if(temp.textContent=="0"){
                temp.style.backgroundColor = 'aqua';
                temp.style.color = 'aqua';
            }
        }
    }
    
    for(let i=0;i<8;i++){
        for(let j=0;j<2;j++){
            let temp = document.getElementById("h"+i+","+j);
            
            if(index==1){
                temp.innerText = document.getElementById("r"+(i+1)+",9").textContent[j];
            }
            else if(index==2){
                temp.innerText = document.getElementById("r2"+(i+1)+",9").textContent[j];
            }
        }
    }

    // cal i2154
    for(let i=1;i<=8;i++){
        for(let j=1;j<=8;j++){
            if(i%2==1){
                let temp = document.getElementById("r"+i+","+(8-(j-1)));
                let opt = document.getElementById("r4"+i+","+j);

                console.log("i = "+i+" => "+opt);
                opt.innerText = temp.textContent;
            }
            else{
                let temp = document.getElementById("r"+i+","+j);
                let opt = document.getElementById("r4"+i+","+j);

                opt.innerText = temp.textContent;
            }
        }
    }

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let temp = document.getElementById("r4"+i+","+j);
            if(temp.textContent=="1"){
                temp.style.backgroundColor = 'red';
                temp.style.color = 'red';
            }
            else if(temp.textContent=="0"){
                temp.style.backgroundColor = 'aqua';
                temp.style.color = 'aqua';
            }
        }
    }
    cal_hex_i2154();
    //

    
    // HEX 노란바탕에 빨간글씨 작업
        for(let i=1;i<=8;i++){
            let temp = document.getElementById("r"+i+",9");
            let temp2 = document.getElementById("r2"+i+",9");
            let temp3 = document.getElementById("r3"+i+",9");
            let temp4 = document.getElementById("r4"+i+",9");

            if(i<=4){
                temp3.style.backgroundColor = "yellow";;
                temp3.style.color = "red";
                temp3.style.fontWeight = "bold";
                temp3.style.fontSize = "3em";
                temp3.style.witdh = "2em";
                temp3.style.height = "1.9em";

                temp3.style.left = "25.5em";
            }

            temp.style.backgroundColor = "yellow";
            temp2.style.backgroundColor = "yellow";
            temp4.style.backgroundColor = "yellow";
            temp.style.color = "red";
            temp2.style.color = "red";
            temp4.style.color = "red";
            temp.style.fontWeight = "bold";
            temp2.style.fontWeight = "bold";
            temp4.style.fontWeight = "bold";

            temp.style.fontSize = "3em";
            temp.style.witdh = "2em";
            temp.style.height = "1.9em";
            temp2.style.fontSize = "3em";
            temp2.style.witdh = "2em";
            temp2.style.height = "1.9em";
            temp4.style.fontSize = "3em";
            temp4.style.witdh = "2em";
            temp4.style.height = "1.9em";

            temp.style.left = "25.5em";
            temp2.style.left = "25.5em";
            temp4.style.left = "25.5em";
        }

    //

    /*
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let sel = document.getElementById(i+","+j);
            sel.innerText = document.getElementById("r"+(i+1)+","+(j+1)).textContent;
            if(sel.textContent==1){
                console.log("check");
                sel.style.backgroundColor = "red";
                sel.style.color = "red";
            }
        }
    }
    */
}
function control_display(select){
    let result = document.getElementById("result");
    let result2 = document.getElementById("result2");
    let result3 = document.getElementById("result3");
    let result4 = document.getElementById("result4");
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");
    let btn3 = document.getElementById("btn0");
    let btn4 = document.getElementById("btn3");

    result.style.display = 'none';
    result2.style.display = 'none';
    result3.style.display = 'none';
    result4.style.display = 'none';
    btn1.style.backgroundColor = "black";
    btn2.style.backgroundColor = "black";
    btn3.style.backgroundColor = "black";
    btn4.style.backgroundColor = "black";
    btn1.style.color = "green";
    btn2.style.color = "green";
    btn3.style.color = "green";
    btn4.style.color = "green";

    if(select==0){
        result3.style.display = 'block';
        btn3.style.backgroundColor = "green";
        btn3.style.color = "white";
        index=0;
    }
    else if(select==1){
        result.style.display = 'block';
        btn1.style.backgroundColor = "green";
        btn1.style.color ="white";
        index=1;
    }
    else if(select==2){
        result2.style.display = 'block';
        btn2.style.backgroundColor = "green";
        btn2.style.color ="white";
        index=2;
    }
    else if(select==3){
        result4.style.display = 'block';
        btn4.style.backgroundColor = "green";
        btn4.style.color ="white";
        index=3;
    }
    
    let val1 = document.getElementById("num1");
    let val2 = document.getElementById("num2");

    if(val1.value!=""&&val2.value!=""){
        for(let i=0;i<8;i++){
            for(let j=0;j<2;j++){
                let temp = document.getElementById("h"+i+","+j);

                if(index==1){
                    temp.innerText = document.getElementById("r"+(i+1)+",9").textContent[j];
                }
                else if(index==2){
                temp.innerText = document.getElementById("r2"+(i+1)+",9").textContent[j];
                }
            }
        }
    }

    if(indexR==1){
        reverse_work();
    }
}
function reverse_btn(){
    let btn = document.getElementById("reverse");
    let hex_layer = document.getElementById("hex_wrap");

    if(indexR==0&&index!=0){
        btn.style.backgroundColor = 'red';
        btn.style.color = 'white';
        btn.style.border = '1px solid red';
        hex_layer.style.display='block';

        let num1 = document.getElementById("num1");
        let num2 = document.getElementById("num2");
    
        num1.value = "";
        num2.value = "";
    
        for(let i=1;i<9;i++){
            for(let j=1;j<9;j++){
                if(i!=0){
                    let temp = document.getElementById("r"+i+","+j);
                    temp.style.backgroundColor = 'black';
                    temp.innerText = "";
                }
            }
        }
        for(let i=1;i<9;i++){
            for(let j=1;j<9;j++){
                if(i!=0){
                    let temp = document.getElementById("r2"+i+","+j);
                    temp.style.backgroundColor = 'black';
                    temp.innerText = "";
                }
            }
        }
        for(let i=1;i<5;i++){
            for(let j=1;j<9;j++){
                if(i!=0){
                    let temp = document.getElementById("r3"+i+","+j);
                    temp.style.backgroundColor = 'black';
                    temp.innerText = "";
                }
            }
        }
        for(let i=0;i<8;i++){
            for(let j=0;j<2;j++){
                let temp = document.getElementById("h"+i+","+j);
                temp.value = "";
            }
        }

        indexR=1;
    }
    else if(indexR==1){
        btn.style.backgroundColor = 'black';
        btn.style.color = 'green';
        btn.style.border = '1px solid green';
        hex_layer.style.display='none';

        indexR=0;
    }
}
function reverse_work(){
    let code1;
    let code2;
    let code3;
    let code4;

    if(index==1){
        code1 = document.getElementById("h4,0").value;
        code2 = document.getElementById("h4,1").value;
        code3 = document.getElementById("h5,0").value;
        code4 = document.getElementById("h5,1").value;
    }
    else if(index==2){
        code1 = document.getElementById("h2,0").value;
        code2 = document.getElementById("h2,1").value;
        code3 = document.getElementById("h3,0").value;
        code4 = document.getElementById("h3,1").value;
    }

    let reverse_code = code1+code2+code3+code4;

    let serial_N1 = document.getElementById("h6,0").value;
    let serial_N2 = document.getElementById("h6,1").value;
    let serial_N3 = document.getElementById("h7,0").value;
    let serial_N4 = document.getElementById("h7,1").value;

    serial_N1 = hex_to_binary(serial_N1.toUpperCase());
    serial_N2 = hex_to_binary(serial_N2.toUpperCase());
    serial_N3 = hex_to_binary(serial_N3.toUpperCase());
    serial_N4 = hex_to_binary(serial_N4.toUpperCase());

    let reverse_serial = serial_N1 + serial_N2 + serial_N3 + serial_N4;
    reverse_serial = parseInt(reverse_serial,2).toString(10);

    let num1 = document.getElementById("num1");
    let num2 = document.getElementById("num2");
    
    num1.value = reverse_code;
    num2.value = reverse_serial;
    input_number();
    //console.log("code : "+reverse_code+" , serial : "+reverse_serial);

    /*
    if(j<5){
                let val = document.getElementById("r"+j+","+i).textContent;

                sum1 = sum1 + val;
                
                //document.getElementById("r9,"+i).innerText = parseInt(sum1,2).toString(16);    
            }
            if(j==4){
                sum1 = parseInt(sum1,2).toString(16);
            }
    */
}
function hex_to_binary(num){
    switch(num){
        case "0":
            num = "0000";
            break;
        case "1":
            num = "0001";
            break;
        case "2":
            num = "0010";
            break; 
        case "3":
            num = "0011";
            break;    
        case "4":
            num = "0100";
            break;
        case "5":
            num = "0101";
            break;
        case "6":
            num = "0110";
            break;
        case "7":
            num = "0111";
            break;
        case "8":
            num = "1000";
            break;
        case "9":
            num = "1001";
            break;
        case "A":
            num = "1010";
            break;
        case "B":
            num = "1011";
            break; 
        case "C":
            num = "1100";
            break;
        case "D":
            num = "1110";
            break;
        case "E":
            num = "1110";
            break;
        case "F":
            num = "1111";
            break;
    }
    return num;
}
function setting(){
    const width=3.3;
    const height=2.25;

    let sec = document.getElementById("circle_wrap");
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            sec.innerHTML += "<span id='"+i+","+j+"' class='circle' style='top:"+(4*(i+1)+10)+"em;left:"+(4*j+1)+"em'></span>"
        }
    }

    let result = document.getElementById("result");
    for(let i=0;i<9;i++){
        for(let j=0;j<10;j++){
            result.innerHTML += "<span class='sel' id='r"+i+","+j+"' style='top:"+(22+(i*height))+"em; left:"+(1+(j*width))+"em'></span>";
            let temp = document.getElementById("r"+i+","+j);

            if(i>0&&j>0&&j!=9){
                temp.style.borderRadius = '50%';
                temp.style.width = '2.25em';
                temp.style.left = (1.5+(j*width))+'em';
                temp.style.top = (22+(i*height))+'em';
            }
            if(i==0&&j==0){
                temp.innerText = "구분";
            }
            else if(i==0&&j!=0){
                temp.innerText = "IDDT"+(8-j);
            }
            else if(i!=0&&j==0){
                temp.innerText = "IDSEL"+(7-((i-1)*1));
            }

            if(i==0&&j==9){
                temp.innerText = "HEX";
            }
            if(i!=0&&j==9){
                temp.style.top = 18.15+(i*1.9)+"em";
            }
        }
    }

    result = document.getElementById("result2");
    for(let i=0;i<9;i++){
        for(let j=0;j<10;j++){
            result.innerHTML += "<span class='sel' id='r2"+i+","+j+"' style='top:"+(22+(i*height))+"em; left:"+(1+(j*width))+"em'></span>";
            let temp = document.getElementById("r2"+i+","+j);

            if(i>0&&j>0&&j!=9){
                temp.style.borderRadius = '50%';
                temp.style.width = '2.25em';
                temp.style.left = (1.5+(j*width))+'em';
                temp.style.top = (22+(i*height))+'em';
            }
            if(i==0&&j==0){
                temp.innerText = "구분";
            }
            else if(i==0&&j!=0){
                temp.innerText = "IDDT"+(8-j);
            }
            else if(i!=0&&j==0){
                temp.innerText = "IDSEL"+(7-((i-1)*1));
            }

            if(i==0&&j==9){
                temp.innerText = "HEX";
            }
            if(i!=0&&j==9){
                temp.style.top = 18.15+(i*1.9)+"em";
            }
        }
    }

    result = document.getElementById("result3");
    for(let i=0;i<5;i++){
        for(let j=0;j<10;j++){
            result.innerHTML += "<span class='sel' id='r3"+i+","+j+"' style='top:"+(22+(i*height))+"em; left:"+(1+(j*width))+"em'></span>";
            let temp = document.getElementById("r3"+i+","+j);

            if(i>0&&j>0&&j!=9){
                temp.style.borderRadius = '50%';
                temp.style.width = '2.25em';
                temp.style.left = (1.5+(j*width))+'em';
                temp.style.top = (22+(i*height))+'em';
            }
            if(i==0&&j==0){
                temp.innerText = "구분";
            }
            else if(i==0&&j!=0){
                temp.innerText = "IDDT"+(8-j);
            }
            else if(i!=0&&j==0){
                temp.innerText = "IDSEL"+(3-((i-1)*1));
            }

            if(i==0&&j==9){
                temp.innerText = "HEX";
            }
            if(i!=0&&j==9){
                temp.style.top = 18.15+(i*1.9)+"em";
            }
        }
    }

    result = document.getElementById("result4");
    for(let i=0;i<9;i++){
        for(let j=0;j<10;j++){
            result.innerHTML += "<span class='sel' id='r4"+i+","+j+"' style='top:"+(22+(i*height))+"em; left:"+(1+(j*width))+"em'></span>";
            let temp = document.getElementById("r4"+i+","+j);

            if(i>0&&j>0&&j!=9){
                temp.style.borderRadius = '50%';
                temp.style.width = '2.25em';
                temp.style.left = (1.5+(j*width))+'em';
                temp.style.top = (22+(i*height))+'em';
            }
            if(i==0&&j==0){
                temp.innerText = "구분";
            }
            else if(i==0&&j!=0){
                temp.innerText = "IDDT"+(8-j);
            }
            else if(i!=0&&j==0){
                temp.innerText = "IDSEL"+(7-((i-1)*1));
            }

            if(i==0&&j==9){
                temp.innerText = "HEX";
            }
            if(i!=0&&j==9){
                temp.style.top = 18.15+(i*1.9)+"em";
            }
        }
    }

    let wrap = document.getElementById("hex_wrap");
    for(let i=0;i<8;i++){
        for(let j=0;j<2;j++){
            wrap.innerHTML += "<input class='hex' id='h"+i+","+j+"' style='left:"+((j*11)+3.5)+"em;top:"+((i*2.5)+37)+"em' onblur='reverse_work()'>";
        }
    }

    let groupName;
    for(let x=0;x<8;x++){
        switch(x){
            case 0:
                groupName = "A";
                break;
            case 1:
                groupName = "B";
                break;
            case 2:
                groupName = "C";
                break;
            case 3:
                groupName = "D";
                break;
            case 4:
                groupName = "E";
                break;
            case 5:
                groupName = "F";
                break;
            case 6:
                groupName = "G";
                break;
            case 7:
                groupName = "H";
                break;
        }

        let group = document.getElementById("group"+groupName);
            for(let i=0;i<6;i++){
                for(let j=0;j<9;j++){
                    group.innerHTML += "<span class='sel' id='"+groupName+i+","+j+"' style='top:"+(38+(14*x)+(i*height))+"em; left:"+(1+(j*width))+"em'></span>";
                    let temp = document.getElementById(groupName+i+","+j);
                    if(i==0&&j==0){
                        temp.innerText = groupName;
                    }
                    else if(i==1&&j!=0){
                        temp.innerText = j;
                    }
                    else if(i==2&&j==0){
                        temp.innerText = "H_A_0";
                    }
                    else if(i==3&&j==0){
                        temp.innerText = "H_A_1";
                    }
                    else if(i==4&&j==0){
                        temp.innerText = "H_A_2";
                    }
                    else if(i==5&&j==0){
                        temp.innerText = "H_A_P";
                   }
            }
        }
    }
}
setting();

console.log("Work Start");