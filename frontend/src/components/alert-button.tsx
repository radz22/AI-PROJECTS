import Swal from "sweetalert2";

export const handleSuccessAlert = (alertData: string) => {
  Swal.fire({
    title: "Good job!",
    text: alertData,
    icon: "success",
  });
};
export const handleErrorAlert = (alertData: string) => {
  Swal.fire({
    title: "Oops...",
    text: alertData,
    icon: "error",
  });
};
