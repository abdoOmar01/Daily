const convertDate = (date) => {
  const year = date.getFullYear(); // Get the year (e.g., 2024)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (1-12) and pad with zeros
  const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month and pad with zeros
  const hours = String(date.getHours()).padStart(2, '0'); // Get the hours (0-23) and pad with zeros
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes and pad with zeros

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Adjust hours to 12-hour format
  const formattedHours = (hours % 12) || 12;

  // Construct the final formatted string
  const formattedDate = `${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`;

  return formattedDate
}

export default convertDate