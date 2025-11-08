
    export type RemoteKeys = 'provider/ProviderComponent';
    type PackageType<T> = T extends 'provider/ProviderComponent' ? typeof import('provider/ProviderComponent') :any;