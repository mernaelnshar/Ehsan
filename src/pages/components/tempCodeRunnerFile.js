const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // const user = userCredential.user;

            // await setDoc(doc(db, "users", user.uid), {
            //     firstName: formData.firstName,
            //     fatherName: formData.fatherName,
            //     grandfatherName: formData.grandfatherName,
            //     lastName: formData.lastName,
            //     nationality: formData.nationality,
            //     dateOfBirth: formData.dateOfBirth,
            //     gender: formData.gender,
            //     phoneNumber: formData.phoneNumber,
            //     email: formData.email,
            //     idNumber: formData.idNumber,
                
            // });