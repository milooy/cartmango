# CARTMANGO
통합 쇼핑카트 앱

## 환경
python version: 3.4.3
django version: 1.10.1

## 로컬 환경 세팅
1. virtualenv로 파이썬 3.4.3 버전 가상환경을 만든다.
2. `pip install -r requirements.txt`로 파이썬 패키지 설치
3. `npm install`, `bower update`로 프론트엔드 의존성 설치
4. `python manage.py migrate`로 디비 마이그레이션
5. `./manage.py createsuperuser`로 슈퍼유저 만들기

## 서버 띄우기
1. `gulp`명령어로 less파일을 css로 컴파일, minify한다.
2. `python manage.py runserver`로 서버를 띄운다.
