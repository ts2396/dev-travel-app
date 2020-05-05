import 'regenerator-runtime/runtime';
import { appGetPictureURL, appGetWeatherURL } from '../server/index';

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData },
  };
};

test('should return right weatherAPIUrl', async () => {
  const req = mockRequest();
  const res = mockResponse();
  const currentEnv = process.env;
  process.env = { WB_API_ID: 'test', PB_API_ID: 'testPIX' };
  await appGetWeatherURL(req, res);
  expect(res.send).toHaveBeenCalledWith({ apiUrl: 'https://api.weatherbit.io/v2.0/forecast/test/?key=test'});
});

test('should return right pictureAPIUrl', async () => {
  const req = mockRequest();
  const res = mockResponse();
  const currentEnv = process.env;
  process.env = { WB_API_ID: 'test', PB_API_ID: 'testPIX' };
  await appGetPictureURL(req, res);
  expect(res.send).toHaveBeenCalledWith({ apiUrl: 'https://pixabay.com/api/?key=testPIX'});
});