import { createRealmContext } from '@realm/react';
import { Historic } from './schemas/Historic';

export const {
  RealmProvider,
  useObject,
  useQuery,
  useRealm
} = createRealmContext({
  schema: [Historic]
});
