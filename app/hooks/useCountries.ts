import countries from "world-countries";

const formmattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useContries = () => {
  const getAll = () => formmattedCountries;

  const getByValue = (value: string) => {
    return formmattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useContries;
