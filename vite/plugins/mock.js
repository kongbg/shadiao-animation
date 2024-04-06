import { viteMockServe } from 'vite-plugin-mock'

export default function createMock() {
    return viteMockServe({ 
        supportTs: false,
        logger: false,
        mockPath: "./mock/"
    })
}
