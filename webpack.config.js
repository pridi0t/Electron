// webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/renderer.tsx',                        // 엔트리 파일
    output: {
        path: path.resolve(__dirname, 'dist/public'),   // 출력 디렉토리
        filename: 'renderer.js',                        // 출력 파일명
        clean: true,                                    // 이전 파일 삭제
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],             // 모듈 해석 시 확장자
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // .ts 또는 .tsx 파일에 적용
                use: 'ts-loader', // ts-loader 사용
                exclude: /node_modules/, // node_modules 제외
            },
        ],
    },
    devtool: 'source-map', // 소스 맵 생성
};
