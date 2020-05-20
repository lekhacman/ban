import WeatherApi from './metaWeather';
import config from '../config';

describe('MetaWeather API', function() {
  let http;
  /** @type weatherApi */
  let api;

  beforeEach(function() {
    http = {
      get: jest.fn(),
    };
    api = WeatherApi(config.vendor.metaWeather, { create: () => http });
  });

  it('should query location', async function() {
    const data = [
      {
        title: 'London',
        location_type: 'City',
        woeid: 44418,
        latt_long: '51.506321,-0.12714',
      },
    ];
    http.get.mockResolvedValue({ data });

    const res = await api.search('london');

    expect(res[0]).toEqual({
      title: 'London',
      type: 'City',
      id: 44418,
    });
  });

  it('should getWeather of a location', async function() {
    const data = {
      consolidated_weather: [
        {
          id: 5127080196964352,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'W',
          created: '2020-05-19T12:16:02.113348Z',
          applicable_date: '2020-05-19',
          min_temp: 14.46,
          max_temp: 24.25,
          the_temp: 21.905,
          wind_speed: 4.011244834165805,
          wind_direction: 279.9799881839581,
          air_pressure: 1023.5,
          humidity: 53,
          visibility: 10.66055485961982,
          predictability: 70,
        },
        {
          id: 5113057883717632,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'SSW',
          created: '2020-05-19T12:16:02.023033Z',
          applicable_date: '2020-05-20',
          min_temp: 14.825000000000001,
          max_temp: 26.37,
          the_temp: 25.285,
          wind_speed: 4.1625562246772185,
          wind_direction: 200.50053345624835,
          air_pressure: 1022,
          humidity: 45,
          visibility: 12.479929710490733,
          predictability: 70,
        },
      ],
      time: '2020-05-19T16:08:57.843685+01:00',
      sun_rise: '2020-05-19T05:02:31.962962+01:00',
      sun_set: '2020-05-19T20:52:24.429621+01:00',
      timezone_name: 'LMT',
      parent: {
        title: 'England',
        location_type: 'Region / State / Province',
        woeid: 24554868,
        latt_long: '52.883560,-1.974060',
      },
      sources: [
        {
          title: 'BBC',
          slug: 'bbc',
          url: 'http://www.bbc.co.uk/weather/',
          crawl_rate: 360,
        },
      ],
      title: 'London',
      location_type: 'City',
      woeid: 44418,
      latt_long: '51.506321,-0.12714',
      timezone: 'Europe/London',
    };
    http.get.mockResolvedValue({ data });

    const res = await api.getWeather(44418);

    expect(res.weather).toEqual([
      {
        date: '2020-05-19',
        temp: { min: 14.46, max: 24.25 },
      },
      {
        date: '2020-05-20',
        temp: { min: 14.825000000000001, max: 26.37 },
      },
    ]);
  });
});
