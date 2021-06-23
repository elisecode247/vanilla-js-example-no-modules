function isImage(url) {
	return url.toLowerCase().includes('.jpg') || url.toLowerCase().includes('.jpeg') || url.toLowerCase().includes('.gif')
}

export { isImage };
export default isImage;