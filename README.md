# mongo-docker

A light-weight package to run mongo commands in a docker instance. This can be useful when writing node.js scripts to setup local dev environments or for testing.


## Installation

```bash
npm install --save mongo-docker
```

## Usage

```javascript
import MongoDocker from 'mongo-docker';

async function main() {
    const mongoDocker = new MongoDocker({
        imageName: 'test-mongo-docker',
        version: '3.6'
    });

    if (!await mongoDocker.isRunning()) {
        await mongoDocker.start();
    }
}
```


