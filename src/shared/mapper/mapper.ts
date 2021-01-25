import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { UserProfile } from 'src/user/profile/user.profile';
import { DepartmentProfile } from 'src/department/profile/department.profile';
import { PositionProfile } from 'src/position/profile/position.profile';
import { RoleProfile } from 'src/role/profile/role.profile';
import { PermissionProfile } from 'src/permission/profile/permisison.profile';

export const mapper = createMapper({
  name: 'nartcMapper',
  pluginInitializer: classes,
});

mapper
  .addProfile(UserProfile)
  .addProfile(DepartmentProfile)
  .addProfile(PositionProfile)
  .addProfile(RoleProfile)
  .addProfile(PermissionProfile);
