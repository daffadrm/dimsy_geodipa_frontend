export const saveState = (state) =>
{
  try
  {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('persist:geo-dipa-energi-persero', serializedState);
  }
  catch (error)
  {
    console.log("Redux -> saveState: ", error);
  }
};


export const loadState = () =>
{
  try
  {
    const serializedState = localStorage.getItem('persist:geo-dipa-energi-persero');
    if (serializedState === null)
    {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (error)
  {
    console.log("Redux -> loadState: ", error);
    return undefined;
  }
};