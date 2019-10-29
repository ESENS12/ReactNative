# REFERENCES
- https://dev.to/kayis/crawling-websites-in-react-native-38b (Using Cheerio)

# ERROR NOTE
- Unable to resolve module `events`
- 해당 모듈 외에도 install안된 모듈들이 꽤 많아서. rm -rf node_modules -> npm install -> yarn add '' 한땀 한땀 추가해주면 됨..(html parser?쪽에서 install이 빠지는듯함..)
- Buffer 관련  can't find variable: Buffer 가 발생하는데..우선 가장 먼저 사용하는건 htmlparser2의 WritableStream 쪽임 ..여기서 Buffer가 없다고 계속 뱉어냄.

