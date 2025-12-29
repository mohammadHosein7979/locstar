export interface ILoadMore {
    fetchNextPage: any;
    isFetchingNextPage: boolean;
    hasNextPage: boolean | undefined;
}