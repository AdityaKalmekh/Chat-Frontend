const UserList = ({ users }) => (
    <div className="user-list">
      <h5>Active Users</h5>
      <ul className="list-group">
        {users.map((user, index) => (
          <li key={index} className="list-group-item">{user}</li>
        ))}
      </ul>
    </div>
  );
  
export default UserList;
  