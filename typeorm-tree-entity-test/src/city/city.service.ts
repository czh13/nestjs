import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import type { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  @InjectEntityManager()
  entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    // const city = new City();
    // city.name = '深圳';
    // await this.entityManager.save(City, city);
    // const cityChild = new City();
    // cityChild.name = '南山';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '深圳',
    //   },
    // });
    // if (parent) {
    //   cityChild.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild);
    // return this.entityManager.getTreeRepository(City).findTrees();

    // const city = new City();
    // city.name = '华南';
    // await this.entityManager.save(City, city);
    // const cityChild = new City();
    // cityChild.name = '广东';
    // const parent = await this.entityManager.findOne(City, {
    //   where: { name: '华南' },
    // });
    // if (parent) {
    //   cityChild.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild);

    // const cityChild2 = new City();
    // cityChild2.name = '深圳';
    // const parent2 = await this.entityManager.findOne(City, {
    //   where: { name: '广东' },
    // });
    // if (parent2) {
    //   cityChild2.parent = parent2;
    // }
    // await this.entityManager.save(City, cityChild2);
    // return this.entityManager.getTreeRepository(City).findTrees(); //所有情况
    // return this.entityManager.getTreeRepository(City).findRoots(); //父节点

    const parent = this.entityManager.findOne(City, {
      where: { name: '广东' },
    });
    // return this.entityManager
    //   .getTreeRepository(City)
    //   .findDescendantsTree(parent); //某个节点的所有后代节点,findDescendants平铺

    // return this.entityManager.getTreeRepository(City).findAncestorsTree(parent); //某个节点的所有祖先节点

    return this.entityManager.getTreeRepository(City).countAncestors(parent); // 数量祖先
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
