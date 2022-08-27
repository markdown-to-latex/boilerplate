require('./tex-config')
    .builder.makeSync()
    .build()
    .apply(2 /* set times of build */);
