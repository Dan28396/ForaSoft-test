const checkBeforeSubmit = (event, buttonClicked) => {
  return event.key === 'Enter' || event.key === 'NumpadEnter' || buttonClicked;
};

export {
  checkBeforeSubmit
}
