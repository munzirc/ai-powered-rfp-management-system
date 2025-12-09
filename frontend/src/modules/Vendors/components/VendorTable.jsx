const VendorTable = ({ vendors, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto border border-white/10 rounded-lg bg-[#121212]">
      <table className="min-w-full text-sm text-white/90">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="p-3 text-left font-medium">Name</th>
            <th className="p-3 text-left font-medium">Email</th>
            <th className="p-3 text-left font-medium">Company</th>
            <th className="p-3 text-left font-medium">Phone</th>
            <th className="p-3 text-left font-medium">Contact Person</th>
            <th className="p-3 text-left font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendors.length === 0 ? (
            <tr key="table-empty">
              <td
                colSpan={6}
                className="text-center py-6 text-white/40 italic"
              >
                No vendors added yet.
              </td>
            </tr>
          ) : (
            vendors.map((vendor) => (
              <tr
                key={vendor._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-3">{vendor.name}</td>
                <td className="p-3">{vendor.email}</td>
                <td className="p-3">{vendor.company}</td>
                <td className="p-3">{vendor.phone}</td>
                <td className="p-3">{vendor.contact_name}</td>
                <td className="p-3 flex gap-4">
                  <button
                    onClick={() => onEdit(vendor)}
                    className="text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(vendor)}
                    className="text-red-400 hover:text-red-300 underline-offset-2 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
