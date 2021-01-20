import { InternalServerErrorException } from "@nestjs/common";
import { DeepPartial, DeleteResult, Repository, UpdateResult } from "typeorm";
import {
  QueryDeepPartialEntity
} from "typeorm/query-builder/QueryPartialEntity";
import { Base } from "./base.entity";

export abstract class BaseService<T extends Base>{
  protected repository: Repository<T>;

  createRepo(doc?: DeepPartial<T>): T {
    return this.repository.create(doc);
  }

  async create(item: DeepPartial<T>): Promise<T> {
    try {
      return await this.repository.save(item);
    } catch (error) {
      BaseService.throwInternalErrorException(error);
    }
  }

  async update(
    filter = {},
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    try {
      return await this.repository.update(filter, data);
    } catch (error) {
      BaseService.throwInternalErrorException(error);
    }
  }

  async count(filter = {}): Promise<number> {
    try {
      return await this.repository.count(filter);
    } catch (error) {
      BaseService.throwInternalErrorException(error);

    }
  }

  async findAndCount(filter = {}): Promise<[T[], number]> {
    try {
      return await this.repository.findAndCount(filter);
    } catch (error) {
      BaseService.throwInternalErrorException(error);

    }
  }

  async findAll(filter = {}): Promise<T[]> {
    try {
      return await this.repository.find(filter);
    } catch (error) {
      BaseService.throwInternalErrorException(error);

    }
  }

  async findById(id: string): Promise<T> {
    try {
      return await this.repository.findOne({ where: { id } });
    } catch (error) {
      BaseService.throwInternalErrorException(error);

    }
  }

  async findOne(filter = {}): Promise<T> {
    try {
      return await this.repository.findOne(filter);
    } catch (error) {
      BaseService.throwInternalErrorException(error);
    }
  }

  async delete(id: string): Promise<UpdateResult> {
    try {
      return await this.repository.softDelete(id);
    } catch (error) {
      BaseService.throwInternalErrorException(error);
    }
  }

  async destroy(id: string): Promise<DeleteResult> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      BaseService.throwInternalErrorException(error);
    }
  }

  protected static throwInternalErrorException(err: Error): void {
    throw new InternalServerErrorException(err.message, err.name);
  }

}