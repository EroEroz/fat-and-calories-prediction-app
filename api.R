install.packages("plumber")
library(plumber)
library(randomForest)

#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
}

#* Load trained model
model_calories <- readRDS("saved_models/model_calories.rds")

#* @param Age:int
#* @param Gender
#* @param Height:double
#* @param Weight:double
#* @param Duration:double
#* @param Intensity_Level
#* @get /predict
function(Age, Gender, Height, Weight, Duration, Intensity_Level){
    Gender_num <- ifelse(tolower(Gender) == "male", 1,
                            ifelse(tolower(Gender) == "female", 0, NA))
    Intensity_Level_clean <- tools::toTitleCase(tolower(Intensity_Level))
    
    if (is.na(Gender_num)) {
        return(list(error = "Invalid gender. Please enter 'male' or 'female'."))
    }
    allowed_levels <- c("Low", "Moderate", "High", "Very High")
    if (!(Intensity_Level_clean %in% allowed_levels)) {
        return(list(error = "Invalid Intensity_Level. Please enter 'Low', 'Moderate', or 'High'."))
    }
    newdata <- data.frame(
        Age = as.integer(Age),
        Gender = as.integer(Gender_num),
        Height = as.numeric(Height),
        Weight = as.numeric(Weight),
        Duration = as.numeric(Duration),
        Intensity_Level = factor(Intensity_Level_clean, levels = allowed_levels)
    )
    pred <- predict(model_calories, newdata)
    list(prediction = as.numeric(pred))
}
