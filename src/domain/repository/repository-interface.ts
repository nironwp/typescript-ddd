import { Model } from "sequelize-typescript";

export interface AllOpts {
    limit?: number;
    offset?: number;
    include: any[];
}


export default interface RepositoryInterface<T> {
    save(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(opts: AllOpts): Promise<T[]>;
}