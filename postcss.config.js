module.exports= {
    plugins: [
        require('cssnano')({
            discardComments: {removeAll:true,},
            safe:true,
        }),
    ]
}

