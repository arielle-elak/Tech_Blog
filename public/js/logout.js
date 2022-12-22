// Script for Logging out the user

const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Once the session has been destroyed, forward the page back to the home screen
    if (response.ok) {
      document.location.replace('/');
    } else {
      console.log(response);
    }
  };

  // Listener to attach the logout function to the logout button
  document.querySelector('#logout').addEventListener('click', logout);
