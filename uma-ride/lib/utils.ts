import { Ride } from "@/types/type";

// Function to sort rides by their creation date & time
export const sortRides = (rides: Ride[]): Ride[] => {
  // Sort the rides in descending order (latest first)
  const result = rides.sort((a, b) => {
    // Combine created_at (date string) and ride_time (duration in minutes?) to build a Date object for comparison
    const dateA = new Date(`${a.created_at}T${a.ride_time}`);
    const dateB = new Date(`${b.created_at}T${b.ride_time}`);

    // Newest ride comes first
    return dateB.getTime() - dateA.getTime();
  });

  // Reverse the sorted array to make oldest first (ascending order)
  return result.reverse();
};

// Function to format a duration (in minutes) into "Xh Ym" or "Z min"
export function formatTime(minutes: number): string {
  // Ensure minutes is a whole number, default to 0 if invalid
  const formattedMinutes = +minutes?.toFixed(0) || 0;

  // If less than 60 minutes, just return minutes
  if (formattedMinutes < 60) {
    return `${minutes} min`;
  } else {
    // Otherwise, convert minutes into hours + remaining minutes
    const hours = Math.floor(formattedMinutes / 60);
    const remainingMinutes = formattedMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
}

// Function to format a date string into "DD Month YYYY"
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Add leading zero to day if less than 10 (Ex: 9 => 09)
  return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}
