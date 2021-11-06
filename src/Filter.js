import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters, selectUniqueColors } from './store/products';

const Filter = () => {
  // const colors = ['azul', 'rosa', 'preta'];
  const colors = useSelector(selectUniqueColors);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [selectedColors, setSelectedColors] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeFilters({ name: 'colors', value: selectedColors }));
  }, [dispatch, selectedColors]);

  React.useEffect(() => {
    dispatch(
      changeFilters({
        name: 'prices',
        value: {
          min: Number(minPrice),
          max: Number(maxPrice),
        },
      })
    );
  }, [dispatch, minPrice, maxPrice]);

  function handleChange({ target }) {
    if (target.checked) {
      setSelectedColors([...selectedColors, target.value]);
    } else {
      setSelectedColors(
        selectedColors.filter((color) => color !== target.value)
      );
    }
  }

  function handleChecked(color) {
    return selectedColors.includes(color);
  }

  return (
    <div>
      <input
        type='number'
        value={minPrice}
        onChange={({ target }) => setMinPrice(target.value)}
        placeholder='min'
      />
      <input
        type='number'
        value={maxPrice}
        onChange={({ target }) => setMaxPrice(target.value)}
        placeholder='max'
      />
      {colors.map((color) => (
        <label key={color}>
          <input
            type='checkbox'
            value={color}
            checked={handleChecked(color)}
            onChange={handleChange}
          />
          {color[0].toUpperCase() + color.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default Filter;
