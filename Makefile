# setup
open: setup
	nix-shell --run 'webstorm .'

setup:
	nix-shell --run 'bun i'

watch:
	bun --watch bin/generateUrl.ts

# --bun 옵션을 넣으면 에러가 난다. bun 자체의 버그인듯
run:
	bun run dev

# docker
dev:
	docker compose up -d
	sleep 1

dev-clean:
	docker compose down -v --rmi local
	sleep 1

# db
# 되도록 사용하지 말것. --name 옵션을 써서 migration 을 명시적으로 해줄 것.
db-up:
	prisma migrate dev

# 한 단계 버전 다운이 아닌 완전 초기화임.
# 원하는 버전으로 돌리는건 --to 써서 버전 명시 해줄 것.
db-down:
	prisma migrate reset

db-deploy:
	prisma migrate deploy

# test
cypress-open:
	npx cypress open

cypress-headless:
	npx cypress run

e2e:
	start-server-and-test dev http://localhost:3000 cypress

e2e-headless:
	start-server-and-test dev http://localhost:3000 cypress-headless

# deploy
build: db-deploy
	vercel build

deploy: build
	vercel deploy --prebuilt
