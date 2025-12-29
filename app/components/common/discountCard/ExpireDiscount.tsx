"use client";

interface Props {
    id: number;
    onChangeUsed: () => void
}

const ExpireDiscount = ({id, onChangeUsed}: Props) => {

  const expire = () => {
    console.log(id)
    onChangeUsed()
    // apiClient.put(`/owner/discount/${id}/expire`)
    // .then(res => {
    //     toast.success("این تخفیف منقضی شد")
    //     onChangeUsed()
    // })
  };

  return (
    <div className="rounded-full border border-sky-800" onClick={expire}>منقضی کردن</div>
  );
};

export default ExpireDiscount;
