
export default interface BaseEntity<T> {
    _Id: string;
    _CreationDate: Date;
    _UpdatedDate: Date;

    Save(): Promise<T>;
    Get(): Promise<T>;
    Update(): Promise<T>;
    Delete(): Promise<any>;

}
