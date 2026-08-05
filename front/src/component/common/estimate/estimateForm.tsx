import Customer from "@/component/common/estimate/customer";
import TaxType from "@/component/common/estimate/taxType";
import CreateEstimate from "@/component/common/estimate/createEstimate";

export default function EstimateForm() {
  return (
    <>
      <Customer />
      <TaxType />
      <CreateEstimate />
    </>
  );
}
