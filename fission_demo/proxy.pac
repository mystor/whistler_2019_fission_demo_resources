function FindProxyForURL(url, host) {
  if (host == 'fission_example1.com' || host == 'fission_example2.com' || host == 'fission_example3.com') {
    return 'PROXY 127.0.0.1:8000';
  }

  return 'DIRECT';
}
