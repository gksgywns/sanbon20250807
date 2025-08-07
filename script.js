
document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const result = document.getElementById('result');
    const selectedNumbers = document.getElementById('selectedNumbers');

    drawButton.addEventListener('click', drawNumbers);
    resetButton.addEventListener('click', resetDraw);

    function drawNumbers() {
        // 뽑기 시작 알림
        Swal.fire({
            title: '당번 뽑는 중...',
            text: '잠시만 기다려주세요!',
            icon: 'info',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            performDraw();
        });
    }

    function performDraw() {
        // 1부터 25까지의 숫자 배열 생성
        const numbers = Array.from({length: 25}, (_, i) => i + 1);
        
        // 피셔-예이츠 셔플 알고리즘으로 배열 섞기
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        // 처음 5개 선택
        const selected = numbers.slice(0, 5).sort((a, b) => a - b);
        
        // 결과 표시
        displayResults(selected);
        
        // 버튼 상태 변경
        drawButton.style.display = 'none';
        resetButton.classList.remove('d-none');
        result.classList.remove('d-none');
        
        // 결과 발표 알림
        setTimeout(() => {
            Swal.fire({
                title: '🎉 당번이 정해졌습니다!',
                text: `선택된 번호: ${selected.join(', ')}번`,
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#28a745',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut'
                }
            });
        }, 2500);
    }

    function displayResults(numbers) {
        selectedNumbers.innerHTML = '';
        
        numbers.forEach((number, index) => {
            setTimeout(() => {
                const numberCard = document.createElement('div');
                numberCard.className = 'number-card animate-bounce-in';
                numberCard.innerHTML = `
                    <div class="d-flex flex-column align-items-center">
                        <div class="fw-bold">${number}</div>
                        <small style="font-size: 0.7rem;">번</small>
                    </div>
                `;
                
                selectedNumbers.appendChild(numberCard);
                
                // 애니메이션 효과 추가
                setTimeout(() => {
                    numberCard.classList.add('animate-in');
                }, 50);
                
            }, index * 300);
        });
    }

    function resetDraw() {
        // 리셋 확인 대화상자
        Swal.fire({
            title: '다시 뽑으시겠습니까?',
            text: '현재 결과가 초기화됩니다.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '네, 다시 뽑겠습니다',
            cancelButtonText: '취소',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // 결과 숨기기
                document.getElementById('result').classList.add('d-none');
                selectedNumbers.innerHTML = '';
                
                // 버튼 상태 변경
                drawButton.style.display = 'inline-block';
                resetButton.classList.add('d-none');
                
                // 리셋 완료 알림
                Swal.fire({
                    title: '초기화 완료!',
                    text: '새로운 당번을 뽑아보세요.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
            }
        });
    }

    // 페이지 로드 시 환영 메시지
    setTimeout(() => {
        Swal.fire({
            title: '청소 당번 뽑기에 오신 것을 환영합니다! 👋',
            text: '공정하고 랜덤한 추첨으로 당번을 정해보세요.',
            icon: 'info',
            confirmButtonText: '시작하기',
            confirmButtonColor: '#667eea',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        });
    }, 500);
});
