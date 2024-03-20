# setup
open: setup
	nix-shell --run 'webstorm .'

setup:
	nix-shell --run 'bun i'

watch:
	bun --watch bin/generateUrl.ts bin/generateApiUrl.ts

# --bun 옵션을 넣으면 에러가 난다. 아직 bun 에서 app route 구현이 안됨
# https://bun.sh/guides/ecosystem/nextjs
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
	bunx prisma migrate dev

# 한 단계 버전 다운이 아닌 완전 초기화임.
# 원하는 버전으로 돌리는건 --to 써서 버전 명시 해줄 것.
db-down:
	bunx prisma migrate reset

db-deploy:
	bunx prisma migrate deploy
	sleep 1

dev-reinitialize: dev-clean dev db-deploy
	bun run prisma/seed.ts


# test
cypress-open:
	bunx cypress open

cypress-headless:
	bunx cypress run

e2e:
	start-server-and-test dev http://localhost:3000 cypress

e2e-headless:
	start-server-and-test dev http://localhost:3000 cypress-headless

# deploy
build: db-deploy
	vercel build

deploy: build
	vercel deploy --prebuilt
