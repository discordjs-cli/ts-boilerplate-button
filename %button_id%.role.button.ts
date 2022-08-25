export default {
    button_id: '%button_id%',
    description: '%button_id% role button',
    async execute(interaction: any) {
        await interaction.deferReply({ ephemeral: true });

        const member = interaction.message.guild.members.cache.get(interaction.user.id);

        const role = '%role_id%'; // Role ID to add/remove
        
        member.roles.cache.find((r) => r.id === `${role}`)
            ? member.roles
                  .remove(`${role}`)
                  .then(async () => {
                      await interaction
                          .editReply({
                              content: `Removed the <@&${role}> role!`,
                              ephemeral: true,
                          })
                          .catch((err) => console.log(err));
                  })
                  .catch((error) => {
                      if (error.message === 'Missing Permissions')
                          return interaction.editReply({
                              content: `**Unable to remove the <@&${role}> role :/**\n\n>>> Contact a server admin about moving my role above the <@&${role}> role so I can remove it :)`,
                              ephemeral: true,
                          });
                  })
            : member.roles
                  .add(`${role}`)
                  .then(async () => {
                      await interaction
                          .editReply({
                              content: `Added the <@&${role}> role!`,
                              ephemeral: true,
                          })
                          .catch((err) => console.log(err));
                  })
                  .catch((error) => {
                      if (error.message === 'Missing Permissions')
                          return interaction.editReply({
                              content: `**Unable to add the <@&${role}> role :/**\n\n>>> Contact a server admin about moving my role above the <@&${role}> role so I can add it :)`,
                              ephemeral: true,
                          });
                  });
        return interaction.reply({ content: 'The %button_id% button was clicked!', ephemeral: false });
    },
};
