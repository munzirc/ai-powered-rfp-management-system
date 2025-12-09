import React, { useEffect } from "react";
import AddVendorButton from "./components/AddVendorButton";
import VendorTable from "./components/VendorTable";
import VendorModal from "./components/VendorModal";
import { useApi } from "../../hooks/useApi";
import {
  fetchVendors,
  updateVendor,
  createVendor,
  deleteVendor,
} from "../../services/vendor.service";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

const VendorView = () => {
  const [vendors, setVendors] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    contact_name: "",
  });
  const [isEdit, setIsEdit] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState(null);

  const { loading, error, call } = useApi();

  useEffect(() => {
    (async () => {
      const data = await call(fetchVendors);
      if (data) {
        setVendors(data);
      } else {
        setVendors([]);
      }
    })();
  }, [call]);

  const openAddModal = () => {
    setIsEdit(false);
    setModalOpen(true);
  };

  const openEditModal = (vendor) => {
    setForm({ ...vendor });
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (isEdit) {
      const updated = await call(updateVendor, form._id, form);

      setVendors((prev) => prev.map((v) => (v._id === form._id ? updated : v)));
    } else {
      const created = await call(createVendor, form);

      console.log("Created vendor:", created);

      setVendors((prev) => [...prev, created]);
    }

    setModalOpen(false);
  };

  const handleDeleteClick = (vendor) => {
    setDeleteTarget(vendor);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    await call(deleteVendor, deleteTarget._id);

    setVendors((prev) => prev.filter((v) => v._id !== deleteTarget._id));

    setDeleteTarget(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Vendors</h2>

        <AddVendorButton onClick={openAddModal} />
      </div>

      <VendorTable
        vendors={vendors}
        onEdit={openEditModal}
        onDelete={handleDeleteClick}
      />

      {modalOpen && (
        <VendorModal
          isEdit={isEdit}
          form={form}
          setForm={setForm}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          title="Delete Vendor"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default VendorView;
