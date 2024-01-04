open: setup
	nix-shell --run 'webstorm .'

setup:
	nix-shell --run 'bun i'

watch:
	bun --watch bin/generateUrl.ts

# --bun 옵션을 넣으면 에러가 난다. bun 자체의 버그인듯
run:
	bun run dev

cypress-open:
	npx cypress open

cypress-headless:
	npx cypress run

e2e:
	start-server-and-test dev http://localhost:3000 cypress

e2e-headless:
	start-server-and-test dev http://localhost:3000 cypress-headless

deploy:
	bun bin/generateUrl.ts
	npm run build
