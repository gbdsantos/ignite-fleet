import { createRealmContext } from '@realm/react';

import { Coords } from './schemas/Coords';
import { Historic } from './schemas/Historic';

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior
}

export const {
  RealmProvider,
  useObject,
  useQuery,
  useRealm
} = createRealmContext({
  schema: [Coords, Historic],
  schemaVersion: 1
});
