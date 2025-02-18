import { AppDataSource } from "./data-source";
import { Department } from "./entity/Department";
import { Employee } from "./entity/Employee";

AppDataSource.initialize()
  .then(async () => {
    const e1 = new Employee();
    e1.name = "张三";
    const e2 = new Employee();
    e2.name = "李四";
    const e3 = new Employee();
    e3.name = "王五";

    const d1 = new Department();
    d1.name = "研发部";
    d1.employees = [e1, e2, e3];

    //todo 保存
    // await AppDataSource.manager.save(Department, d1);

    //todo 查询
    // const deps = await AppDataSource.manager.find(Department, {
    //   relations: {
    //     employees: true, // left join on
    //   },
    // });
    // console.log("🚀 ~ AppDataSource.initialize ~ deps:", deps);

    // const es = await AppDataSource.manager
    //   .getRepository(Department)
    //   .createQueryBuilder("d")
    //   .leftJoinAndSelect("d.employees", "e")
    //   .getMany();
    // console.log("🚀 ~ AppDataSource.initialize ~ es:", es);
    // console.log(es.map((e) => e.employees));

    // const es = await AppDataSource.manager
    //   .createQueryBuilder(Department, "d")
    //   .leftJoinAndSelect("d.employees", "e")
    //   .getMany();
    // console.log("🚀 ~ AppDataSource.initialize ~ es:", es);
    // console.log(es.map((e) => e.employees));

    //todo 删除
    const deps = await AppDataSource.manager.find(Department);
    await AppDataSource.manager.delete(Department, deps[0].id);
  })

  .catch((error) => console.log(error));
