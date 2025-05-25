      <button 
      onClick={() => { updateUser()}}  
      disabled={!editMode.name && !editMode.email && !editMode.phone} 
      style={
        !editMode.name && !editMode.email && !editMode.phone
          ? { display: 'none' }
          : {}
      }
      className="save-btn">
        Save
      </button>