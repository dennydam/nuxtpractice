BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [providerName] NVARCHAR(1000),
    [providerUserId] NVARCHAR(1000),
    [nickname] NVARCHAR(1000) NOT NULL CONSTRAINT [User_nickname_df] DEFAULT 'User',
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000),
    [emailVerified] BIT NOT NULL CONSTRAINT [User_emailVerified_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [avatar] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Appointment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [treatment] NVARCHAR(1000) NOT NULL,
    [appointmentTime] DATETIME2 NOT NULL CONSTRAINT [Appointment_appointmentTime_df] DEFAULT CURRENT_TIMESTAMP,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Appointment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [authorId] NVARCHAR(1000),
    CONSTRAINT [Appointment_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Appointment_appointmentTime_key] UNIQUE NONCLUSTERED ([appointmentTime])
);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
