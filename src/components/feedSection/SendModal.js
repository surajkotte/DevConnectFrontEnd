export const SendModal = ({
  Name,
  photo,
  designation,
  selectedConnections,
  setSelectedConnections,
}) => {
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={photo}
            className="w-full h-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-lg font-semibold truncate">{Name}</h1>
          {designation && (
            <h1 className="text-sm text-gray-500 truncate">{designation}</h1>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center pr-2 w-full">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5"
          checked={selectedConnections}
          onChange={() => setSelectedConnections(!selectedConnections)}
        />
      </div>
    </div>
  );
};
