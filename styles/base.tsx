export const base = {
    flex: 1,
    backgroundColor: '#50D05C',
}

export const container = {
    flex: 1,

}

export const content = {
    paddingLeft: 40,
    paddingRight: 40,
}

export const centerContainer = {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#EAEAEA',
}

export const backgroundCol = {
    backgroundColor: '#EAEAEA',
    flex: 1,
}

export const rowContainer = {
    flexWrap: "wrap",
    flexDirection: 'row'
}

export const rowContainerCenter = {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 10,
}

export const mapContainer = {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
}

export const geoJson = {
    color: "#50D05C",
    weight: 20,
    opacity: 0.65
}

export const titleOverMapHolder = {
    position: "absolute",
    top: 30,

    backgroundColor: "white",
    // fontSize: 20,
    // fontWeight: 'bold',
    // fontFamily: "sans-serif",
    paddingVertical: 4,
    paddingHorizontal: 5,

    // textAlign: "center",
    // alignSelf: 'center',

    shadowOffset: { width: 0, height: 20 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 2,
    shadowRadius: 5,
    // background color must be set
    // backgroundColor: "#0000" // invisible color
    zIndex: 999,
}

export const titleOverMapText = {
    color: '#213F23',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: "sans-serif",
    letterSpacing: 1,

    textAlign: "center",
    alignSelf: 'center',
}

export const arrowLeft = {
    position: "absolute",
    top: 10,
    left: -30,

    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",

    transform: [{ rotate: "-90deg" }],
}

export const arrowRight = {
    position: "absolute",
    top: 10,
    right: -30,

    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",

    transform: [{ rotate: "90deg" }],
}
