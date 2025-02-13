import { createStorage } from 'unstorage';
import redisDriver from 'unstorage/drivers/redis';

export const storage = createStorage({
  driver: redisDriver({
    url: 'redis://default:sMCL3NjabMUIBIP9HvpPKGSFQFkGEzVqK1FLW3DoAp1m9MFWl8b5ev4CGhXgrnM9@apphsi.com:5543/0',
  }),
});
