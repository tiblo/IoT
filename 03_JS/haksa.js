// 제어용 요소 가져오기
const inNum = document.querySelector("#in_num");//인원수
const cbtn = document.querySelector("#create");//생성버튼
const sbtn = document.querySelector("#sum");//총점버튼
const abtn = document.querySelector("#avg");//평균버튼
const sp = document.querySelector("#space");//점수입력 공간
const ev = document.querySelector("#eve");//출력 공간

//산술 처리용 변수
let stNum = 0;//인원수 저장 변수
let sum = 0;//총점 저장 변수
let avg = 0;//평균 저장 변수

//버튼 처리
//생성/초기화 버튼
cbtn.onclick = function(){
    let c = cbtn.innerHTML;//버튼 글자 가져오기

    //생성과 초기화 작업 분류 : 버튼 글자로 분류
    if(c === "생성"){ // 생성 버튼
        //입력한 인원수 가져오기
        stNum = Number(inNum.value);
        //Number() 함수는 ""(빈문자열)이 입력되면 0으로 변환

        //인원수가 입력되어 있지 않으면 함수 종료
        if(stNum == 0){
            alert("인원수를 입력하세요.");//메시지 출력
            return;//함수 종료
        }

        //생성 처리 전 작업
        inNum.value = "";//인원수 입력칸 지우기.
        inNum.disabled = true;//인원수 입력칸 비활성화.
        cbtn.innerHTML = "초기화";//초기화 버튼으로 변경.

        //성적 입력 요소들 생성(인원수에 맞게)
        for(let i = 1; i <= stNum; i++){
            //입력 부모 요소 생성
            const divSt = document.createElement("div");
            divSt.classList.add("student");

            //번호 출력 요소 생성
            const divNo = document.createElement("div");
            divNo.classList.add("no");
            // const noTxt = document.createTextNode(i);
            // divNo.appendChild(noTxt);
            // divNo.appendChild(document.createTextNode(i));
            divNo.innerHTML = i;

            //점수 입력 input
            const scoreInput = document.createElement("input");
            scoreInput.classList.add("score");
            scoreInput.type = "number";

            //컨테이너 div에 번호와 입력칸 추가
            divSt.appendChild(divNo);
            divSt.appendChild(scoreInput);

            //성적 입력 공간에 추가
            sp.appendChild(divSt);
        }
    } else { // 초기화 버튼
        //사용자의 초기화 여부 확인
        let yn = confirm("다시 시작하시겠습니까?");

        if(yn){
            //확인창에서 '확인' 버튼을 누른 경우
            cbtn.innerHTML = "생성";//버튼 글자 변경
            inNum.disabled = false;//입력칸 활성화
            sp.innerHTML = "";//점수 입력 공간 초기화
            ev.innerHTML = "";//총점, 평균 출력 공간 초기화
            sum = 0;//총점 초기화
            avg = 0;//평균 초기화
            stNum = 0;//인원수 초기화
        }
    }
}

//총점 버튼 처리
sbtn.onclick = function(){
    //인원수에 맞게 화면 처리가 되었는지 확인
    if(stNum == 0){
        alert("인원수 입력 후 생성부터 시작해 주세요.");
        return;
    }

    //인원수에 따른 입력 요소를 모아서 처리(배열)
    const scores = document.querySelectorAll(".score");
    sum = 0;//버튼을 누를 때마다 총점을 다시 계산하도록 초기화

    //scores에서 하나씩 input을 꺼내서 value 가져와서 누적.
    for(let s of scores){
        //점수가 입력되지 않은 칸이 있으면 총점 처리 중지
        if(s.value == ""){
            alert("모든 성적을 입력하세요.");
            return;//총점 버튼 처리를 종료
        }

        sum += Number(s.value);//숫자로 변환하여 누적
    }

    //총점 출력 -> eve에 출력
    ev.innerHTML = `<div>총점 : ${sum}</div>`;
}

//평균 버튼 처리
abtn.onclick = function(){
    //인원수 처리 확인
    if(stNum == 0){
        alert("인원수 입력 후 생성부터 시작해 주세요.");
        return;
    }

    //총점 처리 확인
    if(sum == 0){
        alert("총점을 먼저 구하세요.");
        return;
    }

    avg = (sum/stNum).toFixed(2);//평균값 구하기
    //avg = avg.toFixed(2);
    ev.innerHTML = `<div>총점 : ${sum}</div>
                    <div>평균 : ${avg}</div>`;
    // let evTxt = ev.innerHTML;
    // ev.innerHTML = `${evTxt}<div>평균 : ${avg}</div>`;
}